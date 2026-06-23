import waree from '@/assets/brands/waree.png'
import adani from '@/assets/brands/adani.png'
import tata from '@/assets/brands/tatapower.png'
import exide from '@/assets/brands/exidesolar.png'
import vikram from '@/assets/brands/vikramsolar.png'
import luminous from '@/assets/brands/luminoussolar.png'
import microtek from '@/assets/brands/microtek.png'

const brands = [
  waree,
  adani,
  tata,
  exide,
  vikram,
  luminous,
  microtek,
]

export default function Brands() {
  return (
    <section className="bg-brand py-16">

      <div className="mx-auto max-w-7xl px-6">

        <p className="text-center text-lg font-semibold text-sun">
          Trusted Technology Partners
        </p>

        <h2 className="mt-3 mb-16 text-center text-4xl font-extrabold text-white md:text-5xl">
          Brands We Proudly Work With
        </h2>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-7 items-center">

          {brands.map((brand, index) => (

            <div
              key={index}
              className="
                group
                flex
                justify-center
                items-center
                cursor-pointer
              "
            >

              <img
                src={brand}
                alt="Brand Logo"
                className="
                  h-20
                  md:h-24
                  lg:h-28

                  w-auto
                  object-contain

                  transition-all
                  duration-500
                  ease-in-out

                  group-hover:-translate-y-3
                  group-hover:scale-110

                  group-hover:drop-shadow-[0_0_25px_rgba(255,182,4,0.45)]
                "
              />

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}