import { api } from './client';
import type { DiagnosticTest, Lab } from '../types';

interface ApiTest {
  id: string;
  slug: string;
  name: string;
  category: string;
  description: string | null;
  preparation: string | null;
  report_time: string | null;
  starting_price: number | string | null;
  lab_count: number | string;
}

interface ApiLab {
  id: string;
  name: string;
  description: string | null;
  address: string;
  city: string;
  rating: number | string;
  review_count: number | string;
  home_collection: boolean;
  price: number | string;
  original_price: number | string | null;
  available: boolean;
}

const accents = ['#dff4ed', '#e8efff', '#fff0e4', '#f2eaff', '#eaf4ff', '#fcecf1'];

function mapTest(test: ApiTest): DiagnosticTest {
  return {
    id: test.id,
    slug: test.slug,
    name: test.name,
    category: test.category,
    description: test.description || 'Diagnostic test from a LabLink partner laboratory.',
    preparation: test.preparation || 'Please confirm preparation requirements with the selected laboratory.',
    price: Number(test.starting_price ?? 0),
    sample: 'Blood',
    reportTime: test.report_time || 'Contact lab',
    labCount: Number(test.lab_count ?? 0),
    popular: ['complete-blood-count-cbc', 'thyroid-profile-tsh', 'hba1c'].includes(test.slug),
  };
}

export async function getTests(search = ''): Promise<DiagnosticTest[]> {
  const response = await api.get<{ tests: ApiTest[] }>('/tests', { params: search ? { search } : {} });
  return response.data.tests.map(mapTest);
}

export async function getTestBySlug(slug: string): Promise<DiagnosticTest> {
  const response = await api.get<{ test: ApiTest }>(`/tests/${encodeURIComponent(slug)}`);
  return mapTest({ ...response.data.test, starting_price: null, lab_count: 0 });
}

export async function getLabsForTest(slug: string): Promise<Lab[]> {
  const response = await api.get<{ labs: ApiLab[] }>(`/tests/${encodeURIComponent(slug)}/labs`);
  return response.data.labs.map((lab, index) => ({
    id: lab.id,
    name: lab.name,
    rating: Number(lab.rating),
    reviews: Number(lab.review_count),
    distance: [lab.address, lab.city].filter(Boolean).join(', '),
    price: Number(lab.price),
    originalPrice: Number(lab.original_price ?? lab.price),
    availability: lab.available ? 'Booking available' : 'Currently unavailable',
    accent: accents[index % accents.length],
    tags: [lab.home_collection ? 'Home collection' : 'Lab visit', 'Partner laboratory'],
    homeCollection: lab.home_collection,
    available: lab.available,
  }));
}
