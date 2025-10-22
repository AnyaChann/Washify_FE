export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="text-center">
        <div className="mb-4 text-6xl font-bold text-red-500">403</div>
        <h1 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
          Access Denied
        </h1>
        <p className="mb-6 text-gray-600 dark:text-gray-400">
          You don&apos;t have permission to access this page.
          <br />
          This portal is for Admin, Manager, and Staff only.
        </p>
        <a
          href="/auth/sign-in"
          className="inline-block rounded-lg bg-primary px-6 py-3 font-medium text-white hover:bg-opacity-90"
        >
          Back to Sign In
        </a>
      </div>
    </div>
  );
}
