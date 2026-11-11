export interface DiagnosticTest {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string;
  preparation: string;
  price: number;
  sample: string;
  reportTime: string;
  labCount: number;
  popular?: boolean;
}

export interface Lab {
  id: string;
  name: string;
  rating: number;
  reviews: number;
  distance: string;
  price: number;
  originalPrice: number;
  availability: string;
  accent: string;
  tags: string[];
  homeCollection: boolean;
  available: boolean;
}

export interface Booking {
  id: string;
  testName: string;
  labName: string;
  date: string;
  time: string;
  mode: 'Home collection' | 'Lab visit';
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  amount: number;
  address?: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
}
