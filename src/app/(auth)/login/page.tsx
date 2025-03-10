import { loginAction } from '@/actions/auth/loginAction'
import { signupAction } from '@/actions/auth/signupAction'

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-900 p-4">
      <form className="w-full max-w-md space-y-4 rounded-2xl bg-gray-800 p-6 shadow-lg">
        <h2 className="text-xl font-semibold text-gray-100">Signup</h2>

        <div>
          <label htmlFor="email" className="mb-1 block text-gray-400">
            Email:
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="w-full rounded-lg bg-gray-700 px-4 py-2 text-gray-200 transition focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1 block text-gray-400">
            Password:
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full rounded-lg bg-gray-700 px-4 py-2 text-gray-200 transition focus:ring-2 focus:ring-gray-500 focus:outline-none"
          />
        </div>

        <div className="flex space-x-2">
          <button
            formAction={loginAction}
            className="w-1/2 rounded-lg bg-gray-600 py-2 font-semibold text-white transition hover:bg-gray-500"
          >
            Log in
          </button>
          <button
            formAction={signupAction}
            className="w-1/2 rounded-lg bg-gray-700 py-2 font-semibold text-white transition hover:bg-gray-600"
          >
            Sign up
          </button>
        </div>
      </form>
    </div>
  )
}
