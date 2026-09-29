import React, {
  useEffect,
  useRef,
  useState,
} from 'react';

import {
  Routes,
  Route,
  Navigate,
  useNavigate,
} from 'react-router-dom';

import Login from './pages/Login';
import Landingpage from './pages/Landingpage';
import HowItWorks from './pages/HowItWorks';
import ExploreUseCases from './pages/ExploreUseCases';
import HomeSurveillance from './pages/HomeSurveillance';
import VehicleSurveillanceUpload from './pages/VehicleSurveillanceUpload';


/* =========================================================
   BACKEND URL

   Vite environment variable:
   VITE_API_BASE_URL=http://localhost:3000

   The explicit type here avoids the
   "Property 'env' does not exist on type 'ImportMeta'"
   TypeScript error.
========================================================= */

const API_BASE =
  (
    import.meta as unknown as {
      env?: {
        VITE_API_BASE_URL?: string;
      };
    }
  ).env?.VITE_API_BASE_URL || 'http://localhost:3000';


/* =========================================================
   PROTECTED ROUTE
========================================================= */

const ProtectedRoute = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const token = localStorage.getItem('iedge_token');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};


/* =========================================================
   AUTH CALLBACK
   Used after Google / GitHub OAuth
========================================================= */

const AuthCallback = () => {
  const navigate = useNavigate();

  /*
   * Prevent React StrictMode from processing
   * the OAuth callback twice during development.
   */
  const processedRef = useRef(false);

  useEffect(() => {
    if (processedRef.current) {
      return;
    }

    processedRef.current = true;

    const params = new URLSearchParams(
      window.location.search
    );

    const token =
      params.get('token') ||
      params.get('access_token');

    const error =
      params.get('error_description') ||
      params.get('error');

    console.log(
      'OAuth callback URL:',
      window.location.href
    );

    console.log(
      'OAuth token received:',
      !!token
    );

    /* =====================================================
       SUCCESS
    ===================================================== */

    if (token) {
      localStorage.setItem(
        'iedge_token',
        token
      );

      /*
       * Navigate away from the callback URL.
       * This also removes the token from the browser URL.
       */
      navigate('/dashboard', {
        replace: true,
      });

      return;
    }


    /* =====================================================
       ERROR
    ===================================================== */

    alert(
      error ||
      'Authentication failed. Please try again.'
    );

    navigate('/login', {
      replace: true,
    });

  }, [navigate]);


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">

        <p className="text-lg font-semibold">
          Completing authentication...
        </p>

        <p className="text-sm opacity-60 mt-2">
          Please wait.
        </p>

      </div>
    </div>
  );
};


/* =========================================================
   APP
========================================================= */

function App() {
  const [isLoading, setIsLoading] =
    useState(false);

  const navigate = useNavigate();


  /* =========================================================
     LOGIN

     Supports:
     - Email
     - Phone number
  ========================================================= */

  const handleLogin = async (
    identifier: string,
    password: string
  ) => {
    setIsLoading(true);

    try {
      const response = await fetch(
        `${API_BASE}/api/v1/auth/login`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify({
            identifier: identifier.trim(),
            password,
          }),
        }
      );

      const data = await response.json();


      if (
        response.ok &&
        data.access_token
      ) {
        localStorage.setItem(
          'iedge_token',
          data.access_token
        );

        navigate('/dashboard');

      } else {
        alert(
          data.detail ||
          data.message ||
          'Invalid credentials'
        );
      }

    } catch (error: unknown) {

      const message =
        error instanceof Error
          ? error.message
          : 'Failed to connect to server';

      alert(message);

    } finally {
      setIsLoading(false);
    }
  };


  /* =========================================================
     REGISTER

     Supports:
     - Email registration
     - Phone registration
  ========================================================= */

  const handleRegister = async (
    identifier: string,
    password: string,
    method: 'email' | 'phone',
    name: string
  ) => {
    setIsLoading(true);

    try {

      const payload: {
        full_name: string;
        password: string;
        email?: string;
        phone_number?: string;
      } = {
        full_name: name.trim(),
        password,
      };


      /* =====================================================
         EMAIL REGISTRATION
      ===================================================== */

      if (method === 'email') {

        payload.email = identifier
          .trim()
          .toLowerCase();

      }


      /* =====================================================
         PHONE REGISTRATION
      ===================================================== */

      else {

        payload.phone_number =
          identifier.trim();

      }


      const response = await fetch(
        `${API_BASE}/api/v1/auth/register`,
        {
          method: 'POST',

          headers: {
            'Content-Type': 'application/json',
          },

          body: JSON.stringify(payload),
        }
      );


      const data = await response.json();


      /* =====================================================
         REGISTRATION SUCCESS
      ===================================================== */

      if (response.ok) {

        /*
         * If backend returns an access token,
         * automatically login the user.
         */

        if (data.access_token) {

          localStorage.setItem(
            'iedge_token',
            data.access_token
          );

          navigate('/dashboard');

        }

        /*
         * Otherwise send user to login.
         */

        else {

          alert(
            data.message ||
            'Registration successful. Please login.'
          );

          navigate('/login');
        }

      }


      /* =====================================================
         REGISTRATION ERROR
      ===================================================== */

      else {

        alert(
          data.detail ||
          data.message ||
          'Registration failed'
        );
      }

    } catch (error: unknown) {

      const message =
        error instanceof Error
          ? error.message
          : 'Failed to connect to server';

      alert(message);

    } finally {
      setIsLoading(false);
    }
  };


  /* =========================================================
     GOOGLE AUTH
  ========================================================= */

  const handleGoogleAuth = () => {

    window.location.href =
      `${API_BASE}/api/v1/auth/google`;
  };


  /* =========================================================
     GITHUB AUTH
  ========================================================= */

  const handleGithubAuth = () => {

    window.location.href =
      `${API_BASE}/api/v1/auth/github`;
  };


  /* =========================================================
     ROUTES
  ========================================================= */

  return (
    <div className="relative min-h-screen">

      <Routes>

        {/* =================================================
            LOGIN
        ================================================= */}

        <Route
          path="/login"
          element={
            <Login
              onLogin={handleLogin}
              onRegister={handleRegister}
              onGoogleAuth={handleGoogleAuth}
              onGithubAuth={handleGithubAuth}
              isLoading={isLoading}
            />
          }
        />


        {/* =================================================
            HOW IT WORKS
        ================================================= */}

        <Route
          path="/how-it-works"
          element={<HowItWorks />}
        />


        {/* =================================================
            EXPLORE USE CASES
        ================================================= */}

        <Route
          path="/explore-use-cases"
          element={<ExploreUseCases />}
        />


        {/* =================================================
            GOOGLE / GITHUB CALLBACK
        ================================================= */}

        <Route
          path="/auth/callback"
          element={<AuthCallback />}
        />


        {/* =================================================
            ROOT
        ================================================= */}

        <Route
          path="/"
          element={
            <Navigate
              to="/dashboard"
              replace
            />
          }
        />


        {/* =================================================
            DASHBOARD
        ================================================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Landingpage />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            VEHICLE SURVEILLANCE
        ================================================= */}

        <Route
          path="/vehicle-surveillance"
          element={
            <ProtectedRoute>
              <VehicleSurveillanceUpload />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            HOME SURVEILLANCE
        ================================================= */}

        <Route
          path="/home-surveillance"
          element={
            <ProtectedRoute>
              <HomeSurveillance />
            </ProtectedRoute>
          }
        />


        {/* =================================================
            CATCH ALL
        ================================================= */}

        <Route
          path="*"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

      </Routes>

    </div>
  );
}

export default App;