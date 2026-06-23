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
    <section className="bg-white py-16">

      <div className="mx-auto max-w-7xl px-6">

        <p className="text-center text-xl font-extrabold text-black-600">
          Trusted Technology Partners
        </p>

        <h2 className="mt-3 mb-16 text-center text-4xl font-extrabold text-black md:text-5xl">
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
                  ease-out

                  group-hover:-translate-y-2
                  group-hover:scale-105

                  group-hover:drop-shadow-[0_10px_20px_rgba(0,0,0,0.15)]
                "
              />

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}