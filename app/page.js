"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import crypto from 'crypto';

const hashPassword = (password) => {
  return crypto.createHash('sha256').update(password).digest('hex');
};

export default function Home() {
  const [password, setPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userPassword = prompt('Please enter your password:');
    if (userPassword) {
      const hashedPassword = hashPassword(userPassword);
      setPassword(hashedPassword);
      console.log('hashedPassword : ',hashedPassword);
      localStorage.setItem('userPassword', hashedPassword);
    } else {
      alert('Password is required to proceed.');
      window.location.reload();
    }
  }, []);

  return (
    <main className="container mx-auto mt-56 justify-center items-center">
      <h1 className="text-3xl text-gray-200 font-bold mb-4">Welcome to M&S Storage System</h1>
      <p className="text-lg text-gray-400">
        This is a centralized file storage system powered by master & slave technology.
      </p>
      <p className="text-lg text-gray-400">
        You can upload and download files securely using this system.
      </p>
    </main>
  );
}
