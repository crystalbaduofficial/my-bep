'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Award, Download, ArrowLeft, Share2 } from 'lucide-react';

interface Certificate {
  id: string;
  course_title: string;
  certificate_number: string;
  issued_at: string;
}

export default function CertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCertificates();
  }, []);

  async function fetchCertificates() {
    try {
      const res = await fetch('/api/lms/certificates');
      if (res.ok) {
        const data = await res.json();
        setCertificates(data);
      }
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950">
        <p className="text-gray-400">Loading certificates...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-blue-950 to-slate-950 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <Link
          href="/lms"
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition"
        >
          <ArrowLeft size={20} />
          Back to LMS
        </Link>

        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">My Certificates</h1>
            <p className="text-gray-400">Achievements and certifications earned</p>
          </div>
        </div>

        {certificates.length === 0 ? (
          <div className="text-center py-12 premium-card">
            <Award size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400 mb-4">No certificates yet.</p>
            <p className="text-sm text-gray-500">
              Complete courses to earn certificates and showcase your achievements
            </p>
            <Link
              href="/lms"
              className="inline-block mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition"
            >
              Browse Courses
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certificates.map((cert) => (
              <div
                key={cert.id}
                className="premium-card p-8 border-l-4 border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 transition"
              >
                <div className="flex items-start justify-between mb-4">
                  <Award size={32} className="text-blue-400" />
                  <span className="text-xs px-3 py-1 rounded bg-green-900/50 text-green-300 font-semibold">
                    Earned
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{cert.course_title}</h3>
                <p className="text-sm text-gray-400 mb-1">Certification</p>
                <p className="text-xs text-gray-500 font-mono mb-6">
                  Certificate #{cert.certificate_number}
                </p>
                <p className="text-xs text-gray-500 mb-6">
                  Earned {new Date(cert.issued_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold transition">
                    <Download size={16} />
                    Download PDF
                  </button>
                  <button className="flex items-center justify-center px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded font-semibold transition">
                    <Share2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
