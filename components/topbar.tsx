import { Bell, Search } from "lucide-react";

export default function Topbar() {
  return (
    <header className="
      h-20
      w-full
      flex
      items-center
      justify-between
      px-8
      bg-white/80
      backdrop-blur-xl
      border-b
      border-gray-200
    ">

      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-semibold text-[#071A33]">
          Good Morning, Rudi 👋
        </h1>

        <p className="text-sm text-gray-500">
          Welcome back to VE One Enterprise Platform
        </p>
      </div>


      {/* Actions */}
      <div className="flex items-center gap-5">

        {/* Search */}
        <div className="
          flex
          items-center
          gap-3
          px-4
          py-2
          rounded-xl
          bg-gray-100
          text-gray-500
        ">
          <Search size={18}/>

          <span className="text-sm">
            Search...
          </span>
        </div>


        {/* Notification */}
        <button className="
          relative
          w-11
          h-11
          rounded-xl
          bg-gray-100
          flex
          items-center
          justify-center
          hover:bg-gray-200
          transition
        ">
          <Bell size={20}/>

          <span className="
            absolute
            top-2
            right-2
            w-2
            h-2
            rounded-full
            bg-blue-600
          "/>

        </button>


        {/* User */}
        <div className="
          flex
          items-center
          gap-3
        ">
          <div className="
            w-11
            h-11
            rounded-full
            bg-[#071A33]
            text-white
            flex
            items-center
            justify-center
            font-semibold
          ">
            R
          </div>

        </div>

      </div>

    </header>
  );
}