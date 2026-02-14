function ToolCard({ icon: Icon, title, color }) {
  return (
    <div
      className={`
        group rounded-2xl p-6 border
        bg-white/60 backdrop-blur
        hover:shadow-xl hover:-translate-y-1
        transition-all duration-300 cursor-pointer
      `}
    >
      <div
        className={`
          w-12 h-12 rounded-xl flex items-center justify-center
          ${color}
          text-white
          group-hover:scale-110
          transition-transform duration-300
        `}
      >
        <Icon size={24} />
      </div>

      <h3 className="mt-4 text-lg font-semibold text-gray-800">
        {title}
      </h3>

      <p className="text-sm text-gray-500 mt-1">
        Open tool →
      </p>
    </div>
  );
}

export default ToolCard;
