'use server';

import { z } from 'zod';
import { sql } from '@vercel/postgres';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { signIn } from '/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';

const FormSchema = z.object({
  id: z.string(),
  customerId: z.string(),
  amount: z.coerce.number(),
  status: z.enum(['pending', 'paid']),
  date: z.string(),
});

const CreateInvoice = FormSchema.omit({ id: true, date: true });
const UpdateInvoice = FormSchema.omit({ id: true, date: true });

export async function authenticate(prevState, formData) {
  try {
    await signIn('credentials', formData);
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}

export async function createInvoice(formData) {
  const { customerId, amount, status } = CreateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });
  const amountInCents = amount * 100;
  const date = new Date().toISOString().split('T')[0];
  console.log(`${customerId}, ${amount}, ${status}, ${date}`);
    if (!customerId || !amount || !status) {
        return 
        console.log('Please fill in all fields.')
    }

  try {
    await sql`
      INSERT INTO invoices (customer_id, amount, status, date)
      VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Create Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function updateInvoice(id, formData) {
  const { customerId, amount, status } = UpdateInvoice.parse({
    customerId: formData.get('customerId'),
    amount: formData.get('amount'),
    status: formData.get('status'),
  });

  const amountInCents = amount * 100;

  try {
    await sql`
      UPDATE invoices
      SET customer_id = ${customerId}, amount = ${amountInCents}, status = ${status}
      WHERE id = ${id}
    `;
  } catch (error) {
    return {
      message: 'Database Error: Failed to Update Invoice.',
    };
  }

  revalidatePath('/dashboard/invoices');
  redirect('/dashboard/invoices');
}

export async function deleteInvoice(id) {
  try {
    await sql`DELETE FROM invoice_items WHERE invoice_id = ${id}`;
    revalidatePath('/dashboard/invoices');
    return { message: 'Deleted Invoice.'};
  } catch (error) {
    return {
      message: 'Database Error: Failed to Delete Invoice.',
    };
  }
}

export async function newUserSignUp(prevState, formData) {
  try {
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');
    console.log(name, email, password);

    if (!email || !password) {
      return { message: 'Please fill in all fields.' };
    }

    // Check if user already exists
    const existingUser = await sql`
      SELECT * FROM users WHERE email = ${email}
    `;

    if (existingUser.rows.length > 0) {
      return { message: 'User already exists.' };
    }

    // Hash the password
    if (!password || password.length < 6) {
      return { message: 'Password must be at least 6 characters long.' };
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into the database and insert random id
    console.log(name, email, hashedPassword);
    await sql`
      INSERT INTO users (id, name, email, password)
      VALUES (gen_random_uuid(), ${name}, ${email}, ${hashedPassword})
    `;

    revalidatePath('/dashboard');
    redirect('/dashboard');
    
  } catch (error) {
    // Instead of checking error.digest === NEXT_REDIRECT, use (recommended by Next.js) is to simply re-throw any error where error.digest is truthy, since only Next.js internal errors (like redirect) have this property:
    if (error.digest) {
      throw error;
    }
    // only log and return for real errors
    console.error('Error creating user:', error);
    return { message: 'Failed to Create User.' };
  }
}