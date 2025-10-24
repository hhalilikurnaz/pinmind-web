// Mock Ideas Data for Board
export const mockIdeas = [
  {
    id: 1,
    title: "Akıllı Trafik Yönetimi",
    description: "AI destekli trafik ışıkları ile trafik akışını optimize etme",
    author: "Ayşe Yılmaz",
    avatar: "👩‍💼",
    score: {
      feasibility: 85,
      innovation: 78,
      impact: 92
    },
    likes: 24,
    comments: 8,
    timestamp: "2 saat önce",
    tags: ["AI", "Ulaşım", "Akıllı Şehir"],
    color: "mint"
  },
  {
    id: 2,
    title: "Gıda Paylaşım Platformu",
    description: "Restoranlardan artan yemekleri ihtiyaç sahipleriyle buluşturan uygulama",
    author: "Mehmet Kaya",
    avatar: "👨‍💻",
    score: {
      feasibility: 92,
      innovation: 71,
      impact: 88
    },
    likes: 31,
    comments: 12,
    timestamp: "5 saat önce",
    tags: ["Sosyal Sorumluluk", "Uygulama"],
    color: "pink"
  },
  {
    id: 3,
    title: "Yeşil Çatı Sistemi",
    description: "Apartman çatılarında kentsel tarım ve su toplama projesi",
    author: "Zeynep Demir",
    avatar: "👩‍🎨",
    score: {
      feasibility: 76,
      innovation: 82,
      impact: 85
    },
    likes: 18,
    comments: 5,
    timestamp: "1 gün önce",
    tags: ["Çevre", "Sürdürülebilirlik"],
    color: "sky"
  },
  {
    id: 4,
    title: "Sanal Müze Turu",
    description: "VR ile tarihi mekanları ziyaret edebileceğiniz platform",
    author: "Can Öztürk",
    avatar: "👨‍🔬",
    score: {
      feasibility: 88,
      innovation: 95,
      impact: 73
    },
    likes: 27,
    comments: 9,
    timestamp: "1 gün önce",
    tags: ["Eğitim", "Teknoloji", "VR"],
    color: "mint"
  },
  {
    id: 5,
    title: "Komşuluk Ağı",
    description: "Mahalle sakinlerini birbirine bağlayan sosyal platform",
    author: "Elif Şahin",
    avatar: "👩‍🏫",
    score: {
      feasibility: 94,
      innovation: 68,
      impact: 81
    },
    likes: 42,
    comments: 15,
    timestamp: "2 gün önce",
    tags: ["Sosyal", "Topluluk"],
    color: "pink"
  },
  {
    id: 6,
    title: "Akıllı Park Sensörleri",
    description: "Boş park yerlerini gerçek zamanlı gösteren IoT sistemi",
    author: "Ali Yıldız",
    avatar: "👨‍⚕️",
    score: {
      feasibility: 87,
      innovation: 74,
      impact: 79
    },
    likes: 19,
    comments: 6,
    timestamp: "3 gün önce",
    tags: ["IoT", "Ulaşım"],
    color: "sky"
  }
];

// Mock AI Chat History
export const mockChatHistory = [
  {
    role: "assistant",
    content: "Merhaba! Ben PinMind AI Coach'unuz. Fikirlerinizi geliştirmenize yardımcı olabilirim. 🎨"
  },
  {
    role: "user",
    content: "Trafik yönetimi fikrim için geribildirim alabilir miyim?"
  },
  {
    role: "assistant",
    content: "Harika bir başlangıç! Akıllı trafik ışıkları fikrinizi şu yönlerden geliştirebiliriz:\n\n1. **Veri Kaynakları**: Hangi sensörler kullanılacak?\n2. **Maliyet Analizi**: Pilot bölge seçimi\n3. **Toplumsal Etki**: Trafik yoğunluğu %30 azalabilir\n\nHangi alanda derinleşmek istersiniz?"
  }
];
