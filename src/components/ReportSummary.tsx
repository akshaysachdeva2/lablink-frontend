
import { useState } from 'react';
import type { FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { api, getApiError } from '../api/client';

export default function ReportSummary() {
  const [file, setFile] = useState<File | null>(null);
  const [consent, setConsent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setSummary('');

    if (!localStorage.getItem('lablink_token')) {
      setError('Please sign in before uploading a report.');
      return;
    }

    if (!file) {
      setError('Please select a medical report.');
      return;
    }

    if (!consent) {
      setError('Please provide consent before analysis.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('report', file);
      formData.append('consent', 'true');

      const response = await api.post<{
        success: boolean;
        summary: string;
      }>('/reports/summarize', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      setSummary(response.data.summary);
    } catch (err) {
      setError(getApiError(
        err,
        'Unable to analyze your report. Please try again.'
      ));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container page-wrap">
      <div style={{
        maxWidth: '760px',
        margin: '0 auto'
      }}>
        <div className="breadcrumb">
          <Link to="/">Home</Link> / AI Report Summary
        </div>

        <div style={{
          textAlign: 'center',
          marginBottom: '32px'
        }}>
          <span className="eyebrow">POWERED BY GEMINI AI</span>
          <h1 className="detail-title">
            Understand your medical report.
          </h1>
          <p className="muted">
            Upload your diagnostic report and get a simple
            explanation of the results.
          </p>
        </div>

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >
          <div style={{
            border: '2px dashed #b9cfc7',
            borderRadius: '14px',
            padding: '32px 20px',
            textAlign: 'center',
            background: '#f7fbf9'
          }}>
            <h3>Upload your report</h3>

            <p className="muted">
              Supported formats: PDF, JPG and PNG
            </p>

            <input
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,application/pdf,image/jpeg,image/png"
              onChange={event => {
                const selected = event.target.files?.[0] || null;
                setFile(selected);
                setSummary('');
                setError('');
              }}
            />

            {file && (
              <p style={{ marginTop: '12px' }}>
                Selected: <strong>{file.name}</strong>
              </p>
            )}
          </div>

          <label style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px',
            marginTop: '24px'
          }}>
            <input
              type="checkbox"
              checked={consent}
              onChange={event => setConsent(event.target.checked)}
              style={{ marginTop: '4px' }}
            />
            <span>
              I consent to sending this report to Google's Gemini
              AI service for analysis. I understand that the
              summary is educational and is not a medical diagnosis.
            </span>
          </label>

          {error && (
            <p className="form-error">{error}</p>
          )}

          <button
            type="submit"
            className="btn btn-primary btn-block"
            disabled={loading || !file || !consent}
            style={{ marginTop: '24px' }}
          >
            {loading ? 'Analyzing your report…' : 'Generate AI Summary'}
          </button>
        </form>

        {loading && (
          <div className="empty-state" style={{ marginTop: '24px' }}>
            <p>Gemini is reading your report. This may take a moment.</p>
          </div>
        )}

        {summary && (
          <section
            className="booking-form"
            style={{ marginTop: '28px' }}
          >
            <span className="eyebrow">YOUR AI REPORT SUMMARY</span>
            <h2>Report analysis</h2>

            <div style={{
              whiteSpace: 'pre-wrap',
              lineHeight: 1.8,
              overflowWrap: 'anywhere'
            }}>
              {summary}
            </div>

            <p className="muted" style={{ marginTop: '24px' }}>
              This AI-generated explanation is not a diagnosis.
              Please discuss your results with a qualified doctor.
            </p>
          </section>
        )}
      </div>
    </div>
  );
}
