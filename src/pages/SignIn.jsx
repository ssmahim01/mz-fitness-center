const SignIn = () => {
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="card lg:w-2/5 md:w-3/4 mx-auto bg-base-100 w-full shrink-0 shadow-2xl">
        <h2 className="text-center md:text-4xl text-3xl font-bold mt-4">Sign In Form</h2>
        <div className="divider w-11/12 mx-auto -mb-6"></div>

        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-success text-lg text-white font-bold">Sign In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
