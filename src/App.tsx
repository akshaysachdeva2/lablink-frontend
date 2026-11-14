import { useEffect, useMemo, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';

import {
  Link,
  Route,
  Routes,
  useNavigate,
  useParams,
  useLocation,
} from 'react-router-dom';

import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  CalendarCheck,
  Check,
  Clock3,
  HeartPulse,
  MapPin,
  Search,
  ShieldCheck,
  Stethoscope,
  TestTube2,
  Truck,
  WalletCards,
} from 'lucide-react';

import { Layout, PageTitle } from './components/Layout';
import TestCard from './components/TestCard';
import LabCard from './components/LabCard';
import ReportSummary from './components/ReportSummary';

import { api, getApiError } from './api/client';
import {
  getLabsForTest,
  getTestBySlug,
  getTests,
} from './api/tests';

import type {
  AuthUser,
  DiagnosticTest,
  Lab,
} from './types';

// Booking type used by the bookings page
interface Booking {
  id: string;
  testName: string;
  labName: string;
  date: string;
  time: string;
  mode: string;
  status: string;
  amount: number;
  address?: string;
}

// Fetch the test catalogue
function useCatalog() {
  const [tests, setTests] = useState<DiagnosticTest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    getTests()
      .then(setTests)
      .catch(err => setError(getApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  return { tests, loading, error };
}

// Loading screen
function LoadingState({
  text = 'Loading LabLink data…',
}: {
  text?: string;
}) {
  return (
    <div className="container page-wrap">
      <div className="empty-state">
        <Activity />
        <h3>{text}</h3>
      </div>
    </div>
  );
}

// Error screen
function ErrorState({
  message,
  onRetry,
}: {
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="empty-state">
      <ShieldCheck />
      <h3>We couldn't load this page</h3>
      <p>{message}</p>

      {onRetry && (
        <button
          className="btn btn-primary"
          onClick={onRetry}
        >
          Try again
        </button>
      )}

      <Link to="/tests" className="text-link">
        Browse tests
      </Link>
    </div>
  );
}
// Home page
function Home() {
  const { tests, loading, error } = useCatalog();
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const suggestions = useMemo(
    () =>
      tests
        .filter(test =>
          test.name.toLowerCase().includes(query.toLowerCase())
        )
        .slice(0, 4),
    [tests, query]
  );

  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <div className="hero-pill">
              <span className="pulse-dot" />
              Your health, one click closer
            </div>

            <h1>
              Healthcare that
              <br />
              <em>puts you first.</em>
            </h1>

            <p>
              Compare trusted diagnostic labs, transparent prices,
              and convenient home sample collection — all in one place.
            </p>

            <div className="hero-search">
              <Search size={20} />

              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                onKeyDown={event => {
                  if (event.key === 'Enter') {
                    navigate(`/tests?q=${encodeURIComponent(query)}`);
                  }
                }}
                placeholder="Search tests, e.g. CBC, thyroid, vitamin D"
              />

              <button
                onClick={() =>
                  navigate(`/tests?q=${encodeURIComponent(query)}`)
                }
              >
                Search <ArrowRight size={16} />
              </button>

              {query && suggestions.length > 0 && (
                <div className="suggestions">
                  {suggestions.map(test => (
                    <button
                      key={test.id}
                      onClick={() => navigate(`/test/${test.slug}`)}
                    >
                      {test.name}
                      <ArrowUpRight size={14} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="hero-trust">
              <span>
                <ShieldCheck size={16} /> Partner lab listings
              </span>
              <span>
                <WalletCards size={16} /> Upfront pricing
              </span>
              <span>
                <Truck size={16} /> Home collection
              </span>
            </div>
          </div>
          <div className="hero-art">
  <img
    className="hero-photo"
    src="https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1100&q=85"
    alt="Healthcare professional in a modern medical environment"
  />

  <div className="hero-image-overlay"></div>

  <div className="image-badge image-badge-top">
    <span className="image-badge-icon">
      <ShieldCheck size={20} />
    </span>
    <div>
      <strong>Trusted lab partners</strong>
      <small>Compare your options</small>
    </div>
  </div>

  <div className="image-badge image-badge-bottom">
    <span className="image-badge-icon">
      <CalendarCheck size={20} />
    </span>
    <div>
      <strong>Simple booking</strong>
      <small>Choose a convenient slot</small>
    </div>
  </div>

  <div className="image-caption">
    <span>YOUR HEALTH, SIMPLIFIED</span>
    <strong>Better choices begin with clarity.</strong>
  </div>
</div>

          
        </div>
      </section>

      <section className="trust-strip">
        <div className="container trust-inner">
          <span>Making diagnostics simpler</span>
          <strong><ShieldCheck /> Partner lab listings</strong>
          <strong><HeartPulse /> Care that fits your life</strong>
          <strong><WalletCards /> Clear, upfront prices</strong>
        </div>
      </section>

      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">GET STARTED</span>
            <h2>Find the right test for you</h2>
            <p>Explore diagnostic tests and compare available labs.</p>
          </div>

          <Link to="/tests" className="text-link">
            View all tests <ArrowRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="empty-state">
            <Activity />
            <p>Loading tests…</p>
          </div>
        ) : error ? (
          <ErrorState message={error} />
        ) : (
          <div className="test-grid">
            {tests
              .filter(test => test.popular)
              .slice(0, 3)
              .map(test => (
                <TestCard key={test.id} test={test} />
              ))}
          </div>
        )}
      </section>

      <section className="how-section" id="how-it-works">
        <div className="container">
          <div className="section-heading centered">
            <div>
              <span className="eyebrow">SIMPLE BY DESIGN</span>
              <h2>Good health starts here</h2>
              <p>
                From discovery to doorstep collection, we make every
                step easier.
              </p>
            </div>
          </div>

          <div className="steps-grid">
            <Step
              n="01"
              icon={<Search />}
              title="Find your test"
              text="Search our test directory and explore transparent pricing."
            />
            <Step
              n="02"
              icon={<Stethoscope />}
              title="Compare labs"
              text="Choose from the listed diagnostic partners."
            />
            <Step
              n="03"
              icon={<CalendarCheck />}
              title="Book your slot"
              text="Select home collection or a convenient lab visit."
            />
            <Step
              n="04"
              icon={<Activity />}
              title="Get your report"
              text="Follow up with your selected laboratory for your report."
            />
          </div>
        </div>
      </section>

      <section className="cta-section container">
        <div>
          <span className="eyebrow">TAKE THE FIRST STEP</span>
          <h2>
            Your health deserves
            <br />
            a simpler experience.
          </h2>
          <p>Find a test and compare available labs today.</p>
          <Link to="/tests" className="btn btn-light">
            Explore tests <ArrowRight size={16} />
          </Link>
        </div>

        <div className="cta-mark">
          <Activity size={112} />
        </div>
      </section>
    </>
  );
}

// Home page steps
function Step({
  n,
  icon,
  title,
  text,
}: {
  n: string;
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className="step-card">
      <span className="step-number">{n}</span>
      <div className="step-icon">{icon}</div>
      <h3>{title}</h3>
      <p>{text}</p>
    </div>
  );
}

// Tests directory
function TestsPage() {
  const { tests, loading, error } = useCatalog();

  const params = new URLSearchParams(window.location.search);
  const [query, setQuery] = useState(params.get('q') || '');
  const [category, setCategory] = useState('All tests');

  const categories = [
    'All tests',
    ...Array.from(new Set(tests.map(test => test.category))),
  ];

  const filtered = tests.filter(
    test =>
      (category === 'All tests' || test.category === category) &&
      (
        test.name.toLowerCase().includes(query.toLowerCase()) ||
        test.description.toLowerCase().includes(query.toLowerCase())
      )
  );

  return (
    <div className="container page-wrap">
      <PageTitle
        eyebrow="TEST DIRECTORY"
        title="Find the test you need."
        description="Explore diagnostic tests, compare starting prices, and choose a lab that works for you."
      />

      {loading ? (
        <LoadingState text="Loading available tests…" />
      ) : error ? (
        <ErrorState message={error} />
      ) : (
        <>
          <div className="directory-toolbar">
            <div className="directory-search">
              <Search size={18} />
              <input
                value={query}
                onChange={event => setQuery(event.target.value)}
                placeholder="Search by test name or keyword"
              />
            </div>

            <span className="results-count">
              {filtered.length} tests available
            </span>
          </div>

          <div className="category-pills">
            {categories.map(item => (
              <button
                key={item}
                className={category === item ? 'active' : ''}
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>

          {filtered.length ? (
            <div className="test-grid directory-grid">
              {filtered.map(test => (
                <TestCard key={test.id} test={test} />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <TestTube2 />
              <h3>No tests found</h3>
              <p>Try a different search term or category.</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
// Individual test detail and lab comparison
function TestDetail() {
  const { slug = '' } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState<DiagnosticTest | null>(null);
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    setLoading(true);
    setError('');

    Promise.all([
      getTestBySlug(slug),
      getLabsForTest(slug),
    ])
      .then(([loadedTest, loadedLabs]) => {
        if (active) {
          setTest(loadedTest);
          setLabs(loadedLabs);
        }
      })
      .catch(err => {
        if (active) {
          setError(
            getApiError(
              err,
              'Unable to load this test and its partner labs.'
            )
          );
        }
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [slug]);

  if (loading) {
    return <LoadingState text="Loading test and lab prices…" />;
  }

  if (error || !test) {
    return (
      <div className="container page-wrap">
        <ErrorState message={error || 'Test not found.'} />
      </div>
    );
  }

  const availableLabs = labs.filter(lab => lab.available);

  return (
    <div className="container page-wrap">
      <div className="breadcrumb">
        <Link to="/">Home</Link> / <Link to="/tests">Tests</Link> / {test.name}
      </div>

      <div className="detail-layout">
        <div>
          <span className="eyebrow">{test.category.toUpperCase()}</span>
          <h1 className="detail-title">{test.name}</h1>
          <p className="detail-description">{test.description}</p>

          <div className="detail-facts">
            <div>
              <TestTube2 />
              <span>
                Sample type
                <strong>{test.sample}</strong>
              </span>
            </div>

            <div>
              <Clock3 />
              <span>
                Report time
                <strong>{test.reportTime}</strong>
              </span>
            </div>

            <div>
              <ShieldCheck />
              <span>
                Partner labs
                <strong>{availableLabs.length} available labs</strong>
              </span>
            </div>
          </div>

          <h2 className="subheading">Choose a diagnostic lab</h2>
          <p className="muted">
            Compare pricing and availability for this test.
          </p>

          <div className="lab-list">
            {labs.length ? (
              labs.map(lab => (
                <LabCard
                  key={lab.id}
                  lab={lab}
                  onBook={() => navigate(`/book/${test.slug}/${lab.id}`)}
                />
              ))
            ) : (
              <div className="empty-state">
                <h3>No partner labs found</h3>
                <p>
                  There are currently no lab listings for this test.
                </p>
              </div>
            )}
          </div>
        </div>

        <aside className="detail-aside">
          <div className="aside-icon">
            <TestTube2 size={28} />
          </div>

          <span className="eyebrow">STARTING PRICE</span>

          <strong className="aside-price">
            {availableLabs.length
              ? `₹${Math.min(...availableLabs.map(lab => lab.price))}`
              : '—'}
          </strong>

          <p>Compare prices from available partner labs.</p>

          <button
            className="btn btn-primary btn-block"
            onClick={() =>
              document.querySelector('.lab-list')?.scrollIntoView({
                behavior: 'smooth',
              })
            }
          >
            Compare labs <ArrowRight size={16} />
          </button>

          <div className="aside-note">
            <ShieldCheck size={16} /> Prices shown by partner labs
          </div>
        </aside>
      </div>
    </div>
  );
}

// Booking form
function BookingPage() {
  const { testSlug = '', labId = '' } = useParams();
  const navigate = useNavigate();

  const [test, setTest] = useState<DiagnosticTest | null>(null);
  const [lab, setLab] = useState<Lab | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [mode, setMode] = useState<'Home collection' | 'Lab visit'>(
    'Lab visit'
  );

  const getLocalDate = () => {
    const today = new Date();
    const local = new Date(today.getTime() - today.getTimezoneOffset() * 60000);
    return local.toISOString().slice(0, 10);
  };

  const [date, setDate] = useState(getLocalDate);
  const [time, setTime] = useState('08:00 AM');

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    let active = true;

    Promise.all([
      getTestBySlug(testSlug),
      getLabsForTest(testSlug),
    ])
      .then(([loadedTest, loadedLabs]) => {
        if (active) {
          setTest(loadedTest);
          const selectedLab = loadedLabs.find(item => item.id === labId) || null;
          setLab(selectedLab);
          setMode(selectedLab?.homeCollection ? 'Home collection' : 'Lab visit');
        }
      })
      .catch(err => {
        if (active) setError(getApiError(err));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [testSlug, labId]);

  if (loading) {
    return <LoadingState text="Preparing your booking…" />;
  }

  if (error || !test || !lab) {
    return (
      <div className="container page-wrap">
        <ErrorState message={error || 'Booking option not found.'} />
      </div>
    );
  }

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');

    if (!localStorage.getItem('lablink_token')) {
      navigate('/signin', {
        state: { from: `/book/${testSlug}/${labId}` },
      });
      return;
    }

    if (mode === 'Home collection' && !lab.homeCollection) {
      setError(
        'Home collection is not available at this lab. Please choose a lab visit.'
      );
      return;
    }

    setSubmitting(true);

    try {
      await api.post('/bookings', {
        testId: test.id,
        labId: lab.id,
        collectionType: mode === 'Home collection' ? 'home' : 'lab',
        bookingDate: date,
        timeSlot: time,
        patientName: name,
        patientPhone: phone,
        address,
      });

      navigate('/bookings?success=1');
    } catch (err) {
      setError(getApiError(err, 'Could not confirm this booking.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container page-wrap narrow">
      <div className="breadcrumb">
        <Link to="/tests">Tests</Link> / Booking
      </div>

      <PageTitle
        eyebrow="SECURE YOUR SLOT"
        title="Book your test."
        description="A few details and you're all set."
      />

      <form className="booking-form" onSubmit={submit}>
        <div className="booking-summary">
          <div className="summary-icon">
            <TestTube2 />
          </div>

          <div>
            <small>YOUR SELECTION</small>
            <strong>{test.name}</strong>
            <span>{lab.name} · ₹{lab.price}</span>
          </div>

          <strong className="summary-price">₹{lab.price}</strong>
        </div>

        <h3>Where would you like your test?</h3>

        <div className="mode-options">
          <button
            type="button"
            className={
              mode === 'Home collection'
                ? 'mode-option selected'
                : 'mode-option'
            }
            onClick={() => setMode('Home collection')}
            disabled={!lab.homeCollection}
          >
            <Truck />
            <span>
              <strong>Home collection</strong>
              <small>
                {lab.homeCollection
                  ? 'We come to your doorstep'
                  : 'Not offered by this lab'}
              </small>
            </span>
            {mode === 'Home collection' && <Check />}
          </button>

          <button
            type="button"
            className={
              mode === 'Lab visit'
                ? 'mode-option selected'
                : 'mode-option'
            }
            onClick={() => setMode('Lab visit')}
          >
            <MapPin />
            <span>
              <strong>Visit the lab</strong>
              <small>Go to the diagnostic centre</small>
            </span>
            {mode === 'Lab visit' && <Check />}
          </button>
        </div>

        <div className="form-grid">
          <label>
            Choose date
            <input
              required
              type="date"
              min={getLocalDate()}
              value={date}
              onChange={event => setDate(event.target.value)}
            />
          </label>

          <label>
            Time slot
            <select
              value={time}
              onChange={event => setTime(event.target.value)}
            >
              <option>07:00 AM</option>
              <option>08:00 AM</option>
              <option>09:00 AM</option>
              <option>10:00 AM</option>
              <option>11:00 AM</option>
              <option>12:00 PM</option>
            </select>
          </label>
        </div>

        <h3>Your details</h3>

        <div className="form-grid">
          <label>
            Full name
            <input
              required
              minLength={2}
              value={name}
              onChange={event => setName(event.target.value)}
              placeholder="Enter your name"
            />
          </label>

          <label>
            Mobile number
            <input
              required
              inputMode="tel"
              maxLength={20}
              value={phone}
              onChange={event =>
                setPhone(event.target.value.replace(/[^0-9+ -]/g, ''))
              }
              placeholder="Mobile number"
            />
          </label>
        </div>

        {mode === 'Home collection' && (
          <label className="full-label">
            Collection address
            <textarea
              required
              rows={3}
              value={address}
              onChange={event => setAddress(event.target.value)}
              placeholder="House / flat, street, area, city"
            />
          </label>
        )}

        {error && <p className="form-error">{error}</p>}

        <div className="booking-total">
          <span>Total payable</span>
          <strong>₹{lab.price}</strong>
        </div>

        <button
          className="btn btn-primary btn-block"
          type="submit"
          disabled={submitting}
        >
          {submitting ? 'Confirming…' : 'Confirm booking'}
          <ArrowRight size={16} />
        </button>

        <p className="form-footnote">
          <ShieldCheck size={14} />
          Booking details are submitted securely to LabLink.
        </p>
      </form>
    </div>
  );
}// User bookings
function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cancelError, setCancelError] = useState('');
  const [cancellingId, setCancellingId] = useState<string | null>(null);

  const success = new URLSearchParams(window.location.search).get('success');

  useEffect(() => {
    if (!localStorage.getItem('lablink_token')) {
      setLoading(false);
      return;
    }

    api
      .get<{ bookings: Array<Record<string, unknown>> }>('/bookings')
      .then(response => {
        setBookings(
          response.data.bookings.map(row => ({
            id: String(row.id),
            testName: String(row.test_name),
            labName: String(row.lab_name),
            date: String(row.booking_date).slice(0, 10),
            time: String(row.time_slot),
            mode:
              row.collection_type === 'home'
                ? 'Home collection'
                : 'Lab visit',
            status:
              String(row.status).toLowerCase() === 'completed'
                ? 'Completed'
                : String(row.status).toLowerCase() === 'cancelled'
                  ? 'Cancelled'
                  : 'Confirmed',
            amount: Number(row.amount),
            address: row.address ? String(row.address) : undefined,
          }))
        );
      })
      .catch(err => setError(getApiError(err)))
      .finally(() => setLoading(false));
  }, []);

  const cancelBooking = async (bookingId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this booking?'
    );

    if (!confirmed) return;

    setCancelError('');
    setCancellingId(bookingId);

    try {
      await api.patch(`/bookings/${bookingId}/cancel`);

      setBookings(current =>
        current.map(booking =>
          booking.id === bookingId
            ? { ...booking, status: 'Cancelled' }
            : booking
        )
      );
    } catch (err) {
      setCancelError(getApiError(err));
    } finally {
      setCancellingId(null);
    }
  };

  return (
    <div className="container page-wrap">
      <PageTitle
        eyebrow="YOUR HEALTH, IN ONE PLACE"
        title="My bookings."
        description="Keep track of upcoming tests and your booking history."
      />

      {success && (
        <div className="success-banner">
          <Check size={18} /> Your booking has been confirmed.
        </div>
      )}

      {cancelError && (
        <p className="form-error">{cancelError}</p>
      )}

      {!localStorage.getItem('lablink_token') ? (
        <div className="empty-state">
          <CalendarCheck />
          <h3>Sign in to view your bookings</h3>
          <p>Your bookings are securely linked to your account.</p>
          <Link to="/signin" className="btn btn-primary">
            Sign in <ArrowRight size={16} />
          </Link>
        </div>
      ) : loading ? (
        <LoadingState text="Loading your bookings…" />
      ) : error ? (
        <ErrorState message={error} />
      ) : bookings.length ? (
        <div className="booking-list">
          {bookings.map(booking => (
            <article className="booking-card" key={booking.id}>
              <div className="booking-card-icon">
                <CalendarCheck />
              </div>

              <div className="booking-info">
                <div className="booking-title-row">
                  <h3>{booking.testName}</h3>
                  <span className="status-pill">{booking.status}</span>
                </div>

                <p>{booking.labName}</p>

                <div className="booking-meta">
                  <span>
                    <CalendarCheck size={14} />
                    {new Date(`${booking.date}T00:00:00`).toLocaleDateString(
                      'en-IN',
                      {
                        day: 'numeric',
                        month: 'short',
                        year: 'numeric',
                      }
                    )}
                  </span>

                  <span>
                    <Clock3 size={14} />
                    {booking.time}
                  </span>

                  <span>{booking.mode}</span>
                </div>

                <small>Booking ID: {booking.id}</small>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-end',
                  gap: '12px',
                }}
              >
                <strong className="booking-amount">
                  ₹{booking.amount}
                </strong>

                {booking.status === 'Confirmed' && (
                  <button
                    type="button"
                    className="btn btn-primary"
                    disabled={cancellingId === booking.id}
                    onClick={() => cancelBooking(booking.id)}
                  >
                    {cancellingId === booking.id
                      ? 'Cancelling…'
                      : 'Cancel booking'}
                  </button>
                )}
              </div>
            </article>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <CalendarCheck />
          <h3>No bookings yet</h3>
          <p>Your upcoming tests will appear here.</p>
          <Link to="/tests" className="btn btn-primary">
            Find a test <ArrowRight size={16} />
          </Link>
        </div>
      )}
    </div>
  );
}



// Login and registration
function AuthPage({ register = false }: { register?: boolean }) {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const submit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const endpoint = register ? '/auth/register' : '/auth/login';

      const payload = register
        ? { name, email, phone, password }
        : { email, password };

      const response = await api.post<{
        user: AuthUser;
        token: string;
      }>(endpoint, payload);

      localStorage.setItem('lablink_token', response.data.token);
      localStorage.setItem(
        'lablink_user',
        JSON.stringify(response.data.user)
      );

      // Notify the navbar that the user has signed in
      window.dispatchEvent(new Event('lablink-auth-changed'));

      const returnTo = (location.state as { from?: string } | null)?.from;
      navigate(returnTo || '/bookings', { replace: true });
    } catch (err) {
      setError(getApiError(err, 'Authentication failed.'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-wrap">
      <div className="auth-card">
        <Link to="/" className="brand">
          <span className="brand-mark">
            <Activity />
          </span>
          <span>
            lab<span>link</span>
          </span>
        </Link>

        <span className="eyebrow">
          {register ? 'CREATE YOUR ACCOUNT' : 'WELCOME BACK'}
        </span>

        <h1>
          {register ? 'Join LabLink.' : 'Good to see you.'}
        </h1>

        <p>
          {register
            ? 'Create an account to manage your health bookings.'
            : 'Sign in to view and manage your bookings.'}
        </p>

        <form onSubmit={submit}>
          {register && (
            <label>
              Full name
              <input
                required
                minLength={2}
                value={name}
                onChange={event => setName(event.target.value)}
                placeholder="Your name"
              />
            </label>
          )}

          {register && (
            <label>
              Mobile number (optional)
              <input
                value={phone}
                onChange={event => setPhone(event.target.value)}
                placeholder="Mobile number"
              />
            </label>
          )}

          <label>
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              placeholder="you@example.com"
            />
          </label>

          <label>
            Password
            <input
              required
              type="password"
              minLength={register ? 8 : 1}
              value={password}
              onChange={event => setPassword(event.target.value)}
              placeholder={
                register ? 'At least 8 characters' : 'Your password'
              }
            />
          </label>

          {error && <p className="form-error">{error}</p>}

          <button
            className="btn btn-primary btn-block"
            type="submit"
            disabled={submitting}
          >
            {submitting
              ? 'Please wait…'
              : register
                ? 'Create account'
                : 'Sign in'}
            <ArrowRight size={16} />
          </button>
        </form>

        <div className="auth-switch">
          {register
            ? 'Already have an account?'
            : 'New to LabLink?'}{' '}
          <Link to={register ? '/signin' : '/register'}>
            {register ? 'Sign in' : 'Create an account'}
          </Link>
        </div>

        <small className="demo-disclaimer">
          Your account and bookings are stored in the LabLink backend.
        </small>
      </div>
    </div>
  );
}

// Main application routes
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/tests" element={<TestsPage />} />
        <Route path="/test/:slug" element={<TestDetail />} />
        <Route
          path="/book/:testSlug/:labId"
          element={<BookingPage />}
        />
        <Route path="/bookings" element={<BookingsPage />} />
        <Route path="/report-summary" element={<ReportSummary />} />
        <Route path="/signin" element={<AuthPage />} />
        <Route
          path="/register"
          element={<AuthPage register />}
        />
        <Route
          path="*"
          element={
            <div className="container page-wrap">
              <h1>Page not found</h1>
              <Link to="/">Return home</Link>
            </div>
          }
        />
      </Route>
    </Routes>
  );
}