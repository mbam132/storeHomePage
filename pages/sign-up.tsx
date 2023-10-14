import React from 'react';
import Head from 'next/head';
import SignUp from '../components/SignUp';

function SignUpPage() {
  return (
    <div className="mt-navbar mb-[40%] p-3">
      <Head>
        <title>Sign up</title>
      </Head>
      <SignUp />
    </div>
  );
}
export default SignUpPage;
