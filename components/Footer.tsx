'use client'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-neutral-900 text-neutral-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Notex</h3>
            <p className="text-sm">Навчайся краще з ШІ</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Продукт</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Можливості</a></li>
              <li><a href="#" className="hover:text-white transition">Ціни</a></li>
              <li><a href="#" className="hover:text-white transition">Безопасність</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Допомога</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Документація</a></li>
              <li><a href="#" className="hover:text-white transition">Служба підтримки</a></li>
              <li><a href="#" className="hover:text-white transition">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Правові</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white transition">Приватність</a></li>
              <li><a href="#" className="hover:text-white transition">Умови</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-800 pt-8">
          <p className="text-center text-sm">
            © {currentYear} Notex. Всі права захищені.
          </p>
        </div>
      </div>
    </footer>
  )
}
