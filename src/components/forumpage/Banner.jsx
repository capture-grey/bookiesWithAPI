"use client";

export default function Banner({
  title = "Crime and Punishment",
  author = "F. Dostoevsky",
  description = "“Pain and suffering are always inevitable for a large intelligence and a deep heart. The really great men must, I think, have great sadness on earth.” ",
  imageUrl = "/images/banner.jpg",
}) {
  return (
    <section className="relative w-full h-48 md:h-80 rounded-lg overflow-hidden">
      {/* Background Image */}
      <img
        src={imageUrl}
        alt="banner"
        className="w-full h-full object-cover object-center"
      />

      {/* Overlay Content */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4 md:p-8 text-white flex flex-col justify-end md:justify-center">
        {/* Mobile Layout (stacked) */}
        <div className="md:hidden flex flex-col space-y-2">
          <span className="text-xs font-semibold">Featured</span>
          <h2 className="text-xl font-bold leading-tight">{title}</h2>
          <p className="text-xs line-clamp-3">{description}</p>
          <span className="text-xs font-semibold self-end">{author}</span>
        </div>

        {/* Desktop Layout (centered) */}
        <div className="hidden md:flex h-full items-center">
          <div className="grid grid-cols-2 gap-8 w-full items-center">
            <div className="space-y-2">
              <span className="text-sm font-semibold">Featured</span>
              <h2 className="text-3xl font-bold leading-tight">{title}</h2>
              <span className="text-base font-semibold">{author}</span>
            </div>
            <p className="text-base font-serif">{description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
