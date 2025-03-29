
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <div className="max-w-3xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
          <div className="mb-8">
            <Link to="/">
              <Button variant="ghost" size="sm" className="mb-4">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Button>
            </Link>
            <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
            <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              At Virtual Anomaly, we prioritize your privacy and the responsible handling of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Information We Collect</h2>
            <p>We may collect the following types of information:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Information:</strong> Name, email address, and other contact details you provide when signing up for our newsletter, making donations, or contacting us.</li>
              <li><strong>Usage Data:</strong> Information about how you interact with our website, including pages visited, time spent, and actions taken.</li>
              <li><strong>Donation Information:</strong> When you make a donation, we collect payment information necessary to process your contribution.</li>
              <li><strong>Communication Data:</strong> Records of correspondence if you contact us directly.</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
            <p>We use the information we collect for purposes including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Providing, maintaining, and improving our website and services</li>
              <li>Processing donations and sending receipts</li>
              <li>Sending newsletters and updates about our organization</li>
              <li>Responding to your inquiries and providing support</li>
              <li>Analyzing website usage to improve user experience</li>
              <li>Complying with legal obligations</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Sharing Your Information</h2>
            <p>We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Service Providers:</strong> Third parties that help us operate our website, process payments, and deliver our services.</li>
              <li><strong>Legal Requirements:</strong> When required by law, subpoena, or other legal process.</li>
              <li><strong>Protection:</strong> When necessary to protect our rights, privacy, safety, or property.</li>
            </ul>
            <p>We do not sell or rent your personal information to third parties for marketing purposes.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to enhance your experience on our website. You can set your browser to refuse all or some browser cookies, but this may affect your ability to use certain features of our site.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Data Security</h2>
            <p>
              We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Your Rights</h2>
            <p>Depending on your location, you may have rights regarding your personal information, including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Accessing, correcting, or deleting your personal information</li>
              <li>Objecting to or restricting certain processing activities</li>
              <li>Data portability</li>
              <li>Withdrawing consent (where applicable)</li>
            </ul>
            <p>To exercise these rights, please contact us using the information provided below.</p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Children's Privacy</h2>
            <p>
              Our website is not directed to individuals under the age of 13. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Changes to This Privacy Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. The updated version will be indicated by a revised "Last Updated" date at the top of this page. We encourage you to review this Privacy Policy periodically.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have questions or concerns about this Privacy Policy or our practices, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> privacy@virtualanomaly.org<br />
              <strong>Address:</strong> Virtual Anomaly, 123 AI Boulevard, Digital City, DC 10101
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
