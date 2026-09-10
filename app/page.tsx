"use client";

import Image from "next/image";
import {
  AnimatePresence,
  motion,
  useScroll,
  useTransform,
  type Variants,
} from "motion/react";
import { useState } from "react";

const images = [
  { src: "/images/property-01.jpg", title: "Robin Paine", category: "Dominant Partner", number: "69" },
  { src: "/images/property-02.jpg", title: "Greg James", category: "The Submissive One", number: "69" },
  { src: "/images/property-03.jpg", title: "Greg James", category: "Co Founder of IOT Automation", number: "69" },
  { src: "/images/property-04.jpg", title: "Robin | Greg", category: "The Foreplay", number: "69" },
  { src: "/images/property-05.jpg", title: "IOT AUTOMATION", category: "The Company", number: "69" },
  { src: "/images/property-06.jpg", title: "INDONESIA SITE", category: "The Brain", number: "69" },
  { src: "/images/property-07.jpg", title: "FIREFLY & DRAGONFLY", category: "The Showcase", number: "69" },
  { src: "/images/property-08.jpg", title: "Fresh Greg James", category: "The BODY", number: "69" },
  { src: "/images/property-09.jpg", title: "Beyond that Underwear", category: "Sneakky", number: "69" },
  { src: "/images/property-10.jpg", title: "The Sword of Greg James", category: "Revelation", number: "69" },
];

const revealUp: Variants = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const revealSoft: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.96,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 1.1,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

type GalleryImageProps = {
  image: (typeof images)[number];
  index: number;
  className?: string;
  onOpen: (index: number) => void;
};

function GalleryImage({
  image,
  index,
  className = "",
  onOpen,
}: GalleryImageProps) {
  return (
    <motion.button
      type="button"
      onClick={() => onOpen(index)}
      variants={revealSoft}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className={`group relative block w-full overflow-hidden bg-neutral-900 text-left ${className}`}
    >
      <motion.div
        className="absolute inset-0"
        whileHover={{ scale: 1.04 }}
        transition={{
          duration: 1.2,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <Image
          src={image.src}
          alt={image.title}
          fill
          sizes="(max-width: 768px) 100vw, 70vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 bg-black/0 transition-colors duration-700 group-hover:bg-black/25" />

      <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-6 pt-24 md:p-8 md:pt-32">
        <div className="translate-y-3 opacity-80 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100">
          <p className="text-[9px] uppercase tracking-[0.35em] text-white/65">
            {image.number} — {image.category}
          </p>

          <h3 className="mt-2 text-2xl font-light text-white md:text-3xl">
            {image.title}
          </h3>
        </div>
      </div>

      <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-black/10 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
        ↗
      </div>
    </motion.button>
  );
}

export default function Home() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const { scrollYProgress } = useScroll();

  const heroScale = useTransform(scrollYProgress, [0, 0.18], [1, 1.12]);
  const heroY = useTransform(scrollYProgress, [0, 0.18], ["0%", "12%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.14], [1, 0]);

  const openImage = (index: number) => {
    setSelectedImage(index);
  };

  const closeImage = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    setSelectedImage((current) => {
      if (current === null) return null;
      return (current + 1) % images.length;
    });
  };

  const previousImage = () => {
    setSelectedImage((current) => {
      if (current === null) return null;
      return (current - 1 + images.length) % images.length;
    });
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#0a0a09] text-[#f3f0e9]">
      <motion.div
        className="fixed left-0 top-0 z-100 h-0.5 origin-left bg-white"
        style={{ scaleX: scrollYProgress }}
      />

      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 text-white mix-blend-difference md:px-10 md:py-8">
        <div className="flex items-center gap-3">
          <span className="text-xs font-medium tracking-[0.3em]">GJ</span>
          <span className="h-px w-7 bg-white/60" />
          <span className="text-xs font-medium tracking-[0.3em]">RP</span>
        </div>

        <a
          href="#explore"
          className="group flex items-center gap-3 text-[10px] uppercase tracking-[0.3em]"
        >
          <span>Explore</span>
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/40 transition-transform duration-500 group-hover:rotate-45">
            ↓
          </span>
        </a>
      </nav>

      <section className="relative h-screen min-h-175 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{
            scale: heroScale,
            y: heroY,
          }}
        >
          <Image
            src="/images/property-01.jpg"
            alt="Greg James and Robin Paine residence"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/20" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="absolute inset-0 flex flex-col justify-end px-6 pb-20 md:px-12 md:pb-16"
        >
          <div className="max-w-350">
            <motion.p
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1,
                delay: 0.3,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="mb-5 text-[10px] uppercase tracking-[0.45em] text-white/70 md:text-xs"
            >
              STORY UNFOLD
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 70 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 1.3,
                delay: 0.45,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="text-[16vw] font-light leading-[0.78] tracking-[-0.07em] md:text-[12vw]"
            >
              Robin Paine
            </motion.h1>

            <div className="mt-8 flex items-end justify-between gap-8">
              <motion.p
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  delay: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-xs uppercase tracking-[0.35em] text-white/80 md:text-sm"
              >
                Managing Director and Co-founder of IoT Automation
              </motion.p>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 1.1,
                }}
                className="hidden max-w-xs text-right text-sm leading-relaxed text-white/65 md:block"
              >
                Greg James and Robin Paine&apos;s
                <br />
                Bromance Story.
              </motion.p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
          className="absolute bottom-7 left-1/2 flex -translate-x-1/2 flex-col items-center"
        >
          <motion.span
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="h-10 w-px bg-white/60"
          />
        </motion.div>
      </section>

      <section
        id="explore"
        className="relative px-6 py-32 md:px-12 md:py-48"
      >
        <div className="mx-auto grid max-w-350 gap-16 md:grid-cols-12 md:gap-10">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="md:col-span-5"
          >
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
              Tag team
            </p>

            <h2 className="mt-8 text-5xl font-light leading-[0.95] tracking-tighter md:text-7xl">
              Workspace
              <br />
              becomes
              <br />
              experience.
            </h2>
          </motion.div>

          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="flex items-end md:col-span-5 md:col-start-8"
          >
            <p className="max-w-md text-base leading-8 text-white/55 md:text-lg">
              No matter where they were at work, they couldn&apos;t hold back
              the surge of emotion they felt for each other.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="px-5 pb-32 md:px-10 md:pb-48">
        <div className="mx-auto max-w-375">
          <div className="mb-16 flex items-end justify-between border-b border-white/10 pb-6 md:mb-24">
            <div>
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                Working bed
              </p>

              <h2 className="mt-5 text-4xl font-light tracking-[-0.04em] md:text-6xl">
                The Collection
              </h2>
            </div>

            <span className="text-xs text-white/35">IOT BROMANCE</span>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-8">
            <GalleryImage
              image={images[0]}
              index={0}
              className="h-[70vh] md:col-span-8 md:h-[78vh]"
              onOpen={openImage}
            />

            <GalleryImage
              image={images[1]}
              index={1}
              className="h-[55vh] md:col-span-4 md:mt-32 md:h-[58vh]"
              onOpen={openImage}
            />

            <div className="hidden md:col-span-12 md:block md:h-24" />

            <GalleryImage
              image={images[2]}
              index={2}
              className="h-[65vh] md:col-span-7 md:h-[72vh]"
              onOpen={openImage}
            />

            <GalleryImage
              image={images[3]}
              index={3}
              className="h-[55vh] md:col-span-5 md:mt-40 md:h-[62vh]"
              onOpen={openImage}
            />

            <div className="hidden md:col-span-12 md:block md:h-24" />

            <GalleryImage
              image={images[4]}
              index={4}
              className="h-[65vh] md:col-span-5 md:h-[68vh]"
              onOpen={openImage}
            />

            <GalleryImage
              image={images[5]}
              index={5}
              className="h-[58vh] md:col-span-7 md:mt-24 md:h-[75vh]"
              onOpen={openImage}
            />

            <GalleryImage
              image={images[6]}
              index={6}
              className="h-[60vh] md:col-span-6 md:ml-[8.333%] md:h-[70vh]"
              onOpen={openImage}
            />

            <GalleryImage
              image={images[7]}
              index={7}
              className="h-[52vh] md:col-span-5 md:col-start-8 md:mt-36 md:h-[60vh]"
              onOpen={openImage}
            />

            <div className="hidden md:col-span-12 md:block md:h-20" />

            <GalleryImage
              image={images[8]}
              index={8}
              className="h-[68vh] md:col-span-8 md:h-[78vh]"
              onOpen={openImage}
            />

            <GalleryImage
              image={images[9]}
              index={9}
              className="h-[52vh] md:col-span-4 md:mt-40 md:h-[58vh]"
              onOpen={openImage}
            />
          </div>
        </div>
      </section>

      <section className="relative h-[85vh] min-h-150 overflow-hidden">
        <motion.div
          initial={{ scale: 1.08 }}
          whileInView={{ scale: 1 }}
          transition={{
            duration: 2,
            ease: [0.16, 1, 0.3, 1],
          }}
          viewport={{ once: true }}
          className="absolute inset-0"
        >
          <Image
            src="/images/property-04.jpg"
            alt="Kitchen interior"
            fill
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/35" />
        <div className="absolute inset-0 bg-linear-to-t from-black via-transparent to-black/10" />

        <div className="absolute inset-x-6 bottom-12 md:inset-x-12 md:bottom-16">
          <div className="flex items-end justify-between gap-8">
            <motion.div
              variants={revealUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
            >
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/60">
                True Partnership comes within
              </p>

              <h2 className="mt-5 text-5xl font-light tracking-tighter md:text-8xl">
                Very Romantic Sensational
              </h2>
            </motion.div>

            <p className="hidden max-w-xs text-sm leading-7 text-white/60 md:block">
              Designed around movement, daylight and the quiet moments
              between them.
            </p>
          </div>
        </div>
      </section>

      <section className="px-6 py-36 md:px-12 md:py-56">
        <div className="mx-auto max-w-350">
          <motion.div
            variants={revealUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="grid gap-14 md:grid-cols-12"
          >
            <div className="md:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
                BREAKING NEWS
              </p>

              <h2 className="mt-8 text-6xl font-light leading-[0.9] tracking-[-0.06em] md:text-[9vw]">
                IOT
                <br />
                AUTOMATION
                <br />
                SCNDL.
              </h2>
            </div>

            <div className="flex items-end md:col-span-4 md:col-start-9">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-white/40">
                  Greg James
                </p>

                <p className="mt-2 text-xs uppercase tracking-[0.3em] text-white/40">
                  Robin Paine
                </p>

                <div className="mt-10 h-px w-24 bg-white/30" />

                <p className="mt-8 max-w-sm text-sm leading-7 text-white/45">
                  Unit 15/376-380 Eastern Valley Way, Roseville, 2069 NSW,
                  Australia (02) 82316636.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 md:px-12">
        <div className="mx-auto flex max-w-375 items-center justify-between">
          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
            Greg James / Robin Paine
          </p>

          <p className="text-[9px] uppercase tracking-[0.3em] text-white/30">
            Private Couple
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-200 flex items-center justify-center bg-black/95 p-4 md:p-10"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{
                duration: 0.5,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative h-full w-full"
            >
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].title}
                fill
                sizes="100vw"
                className="object-contain"
                priority
              />
            </motion.div>

            <button
              type="button"
              onClick={closeImage}
              aria-label="Close image viewer"
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-xl text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black md:right-8 md:top-8"
            >
              ×
            </button>

            <button
              type="button"
              onClick={previousImage}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-xl text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black md:left-8"
            >
              ←
            </button>

            <button
              type="button"
              onClick={nextImage}
              aria-label="Next image"
              className="absolute right-4 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-black/30 text-xl text-white backdrop-blur-md transition-colors hover:bg-white hover:text-black md:right-8"
            >
              →
            </button>

            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center">
              <p className="text-[10px] uppercase tracking-[0.35em] text-white/50">
                {images[selectedImage].number} / {images.length}
              </p>

              <p className="mt-2 text-sm text-white/80">
                {images[selectedImage].title}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}