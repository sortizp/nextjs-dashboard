// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.
// For simplicity of teaching, we're manually defining these types.
// However, these types are generated automatically if you're using an ORM such as Prisma.

// User object structure
const User = {
  id: '',
  name: '',
  email: '',
  password: '',
};

// Customer object structure
const Customer = {
  id: '',
  name: '',
  email: '',
  image_url: '',
};

// Invoice object structure
const Invoice = {
  id: '',
  customer_id: '',
  amount: 0,
  date: '',
  status: 'pending', // Can be 'pending' or 'paid'
};

// Revenue object structure
const Revenue = {
  month: '',
  revenue: 0,
};

// LatestInvoice object structure
const LatestInvoice = {
  id: '',
  name: '',
  image_url: '',
  email: '',
  amount: '', // Formatted as a string
};

// LatestInvoiceRaw object structure. 
// The database returns a number for amount, but we later format it to a string with the formatCurrency function
const LatestInvoiceRaw = {
  ...LatestInvoice,
  amount: 0, // Amount as a number
};

// InvoicesTable object structure
const InvoicesTable = {
  id: '',
  customer_id: '',
  name: '',
  email: '',
  image_url: '',
  date: '',
  amount: 0,
  status: 'pending', // Can be 'pending' or 'paid'
};

// CustomersTableType object structure
const CustomersTableType = {
  id: '',
  name: '',
  email: '',
  image_url: '',
  total_invoices: 0,
  total_pending: 0,
  total_paid: 0,
};

// FormattedCustomersTable object structure
const FormattedCustomersTable = {
  id: '',
  name: '',
  email: '',
  image_url: '',
  total_invoices: 0,
  total_pending: '', // Formatted as a string
  total_paid: '', // Formatted as a string
};

// CustomerField object structure
const CustomerField = {
  id: '',
  name: '',
};

// InvoiceForm object structure
const InvoiceForm = {
  id: '',
  customer_id: '',
  amount: 0,
  status: 'pending', // Can be 'pending' or 'paid'
};