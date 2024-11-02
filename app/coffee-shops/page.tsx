import { CoffeeShopHeader } from "@/components/layout/header"
import { CoffeeShopFooter } from "@/components/layout/footer"
import { CoffeeShopCard } from "@/components/coffee-shop/coffee-shop-card"
import { getCoffeeShops } from "@/lib/api"

// Revalidate every 6 months (in seconds)
export const revalidate = 15552000

export default async function CoffeeShopsPage() {
  const coffeeShops = await getCoffeeShops("london")

  return (
    <div className="flex flex-col min-h-screen">
      <CoffeeShopHeader />
      <main className="flex-1">
        <section className="container mx-auto py-12 px-4">
          <h1 className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-700">
            London Coffee Shops
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coffeeShops.map((shop) => (
              <CoffeeShopCard key={shop.place_id} shop={shop} />
            ))}
          </div>
        </section>
      </main>
      <CoffeeShopFooter />
    </div>
  )
}