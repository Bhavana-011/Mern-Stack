function Header() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">

      <h1 className="text-2xl font-semibold">
        Investor Service Request Management
      </h1>

      <div className="flex items-center gap-3">

        <div className="text-right">
          <p className="font-medium">
            Admin User
          </p>

          <p className="text-sm text-gray-500">
            Administrator
          </p>
        </div>

      </div>

    </header>
  );
}

export default Header;