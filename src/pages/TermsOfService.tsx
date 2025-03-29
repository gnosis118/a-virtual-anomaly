
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
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
            <h1 className="text-3xl font-bold tracking-tight">Terms of Service</h1>
            <p className="text-muted-foreground mt-2">Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div className="prose prose-lg max-w-none">
            <p>
              Welcome to Virtual Anomaly. These Terms of Service ("Terms") govern your use of our website and services. By accessing our website or using our services, you agree to these Terms. If you do not agree with these Terms, please do not use our website or services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Use of Our Website and Services</h2>
            <p>
              You may use our website and services only for lawful purposes and in accordance with these Terms. You agree not to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Use our website in any way that violates applicable laws or regulations</li>
              <li>Use our website to transmit or send unsolicited or unauthorized advertising or promotional materials</li>
              <li>Attempt to interfere with the proper working of our website</li>
              <li>Bypass any measures we may use to prevent or restrict access to our website</li>
              <li>Use automated means, including scraping, data mining, or extraction methods, to access our website</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Intellectual Property Rights</h2>
            <p>
              The website and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio) are owned by Virtual Anomaly, its licensors, or other providers of such material and are protected by copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-4">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of the material on our website without our prior written consent.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">User Contributions</h2>
            <p>
              Our website may contain forums, blogs, or other interactive features that allow users to post, submit, or publish content. Any content you post or submit is your responsibility. By providing content, you grant us a non-exclusive, royalty-free, perpetual, irrevocable right to use, reproduce, modify, adapt, publish, translate, distribute, and display such content worldwide.
            </p>
            <p className="mt-4">
              You agree that your content will not:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Contain material that is defamatory, obscene, indecent, abusive, offensive, harassing, violent, hateful, inflammatory, or otherwise objectionable</li>
              <li>Infringe any patent, trademark, trade secret, copyright, or other intellectual property rights</li>
              <li>Violate the legal rights of others or contain any material that could give rise to civil or criminal liability</li>
              <li>Be likely to deceive or mislead any person</li>
              <li>Promote illegal activity or advocate, promote, or assist any unlawful act</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Donations</h2>
            <p>
              By making a donation to Virtual Anomaly, you acknowledge that:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>All donations are voluntary and at your discretion</li>
              <li>Donations may be tax-deductible depending on applicable laws, but we make no guarantees</li>
              <li>We reserve the right to use donations as we deem appropriate for our mission</li>
              <li>All donations are final and non-refundable, except in exceptional circumstances at our discretion</li>
            </ul>

            <h2 className="text-xl font-semibold mt-8 mb-4">Links to Other Websites</h2>
            <p>
              Our website may contain links to third-party websites that are not owned or controlled by us. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites. We strongly advise you to read the terms and privacy policy of any website you visit.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided on an "as is" and "as available" basis, without any warranties of any kind, either express or implied. We disclaim all warranties, express or implied, including but not limited to implied warranties of merchantability, fitness for a particular purpose, and non-infringement.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by law, Virtual Anomaly shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to, loss of profits, data, use, or goodwill, arising out of or in connection with your access to or use of our website or services.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Indemnification</h2>
            <p>
              You agree to defend, indemnify, and hold harmless Virtual Anomaly, its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to your violation of these Terms or your use of our website.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the state of [State], without giving effect to any principles of conflicts of law.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Changes to These Terms</h2>
            <p>
              We may revise these Terms from time to time. The most current version will always be on this page. If the revision, in our discretion, is material, we will notify you via email or through our website. By continuing to access or use our website after those revisions become effective, you agree to be bound by the revised Terms.
            </p>

            <h2 className="text-xl font-semibold mt-8 mb-4">Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="mt-2">
              <strong>Email:</strong> legal@virtualanomaly.org<br />
              <strong>Address:</strong> Virtual Anomaly, 123 AI Boulevard, Digital City, DC 10101
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default TermsOfService;
