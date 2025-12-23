export default function Button({children}: { children?: React.ReactNode }) {
    return (
        <button
        className="
          button
          rounded-2xl
          border border-(--glass-border)
          px-6 py-3
          font-semibold
          shadow-2xl/20
          inset-shadow-sm inset-shadow-current/20
          backdrop-blur-sm
          bg-(--glass-bg)
          text-white
          w-fit
          cursor-pointer
          hover:scale-110
          transition-transform duration-300
        "
      >
        {children}
      </button>
    );
}
