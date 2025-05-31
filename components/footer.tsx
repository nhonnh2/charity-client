import Link from "next/link"
import { Facebook, Github, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="text-lg font-semibold mb-4">TrustCharity</h3>
            <p className="text-muted-foreground mb-4">
              Nền tảng kêu gọi quỹ từ thiện minh bạch sử dụng công nghệ blockchain.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên kết</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-foreground">
                  Trang chủ
                </Link>
              </li>
              <li>
                <Link href="/campaigns" className="text-muted-foreground hover:text-foreground">
                  Chiến dịch
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="text-muted-foreground hover:text-foreground">
                  Cách thức hoạt động
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-foreground">
                  Về chúng tôi
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-muted-foreground hover:text-foreground">
                  Blog
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Danh mục</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/campaigns?category=education" className="text-muted-foreground hover:text-foreground">
                  Giáo dục
                </Link>
              </li>
              <li>
                <Link href="/campaigns?category=health" className="text-muted-foreground hover:text-foreground">
                  Y tế
                </Link>
              </li>
              <li>
                <Link href="/campaigns?category=environment" className="text-muted-foreground hover:text-foreground">
                  Môi trường
                </Link>
              </li>
              <li>
                <Link href="/campaigns?category=disaster" className="text-muted-foreground hover:text-foreground">
                  Thiên tai
                </Link>
              </li>
              <li>
                <Link href="/campaigns?category=other" className="text-muted-foreground hover:text-foreground">
                  Khác
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Liên hệ</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                <span className="text-muted-foreground">123 Đường Nguyễn Huệ, Quận 1, TP. Hồ Chí Minh</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">+84 123 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span className="text-muted-foreground">info@trustcharity.vn</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-12 pt-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted-foreground">
              &copy; {new Date().getFullYear()} TrustCharity. Tất cả quyền được bảo lưu.
            </p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <Link href="/terms" className="text-sm text-muted-foreground hover:text-foreground">
                Điều khoản sử dụng
              </Link>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:text-foreground">
                Chính sách bảo mật
              </Link>
              <Link href="/faq" className="text-sm text-muted-foreground hover:text-foreground">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
