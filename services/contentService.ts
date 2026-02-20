
import { Topic, Question } from '../types';

/**
 * DEVELOPER CONTENT MANAGEMENT
 * To add a new topic:
 * 1. Add a new object to the `rawTopicData` array.
 * 2. Ensure each has exactly 20 questions.
 */

const rawTopicData = [
  {
    id: 't1',
    title: 'Topic 7: Family – Part 1',
    image: 'https://images.unsplash.com/photo-1511895426328-dc8714191300?w=600&q=80',
    words: [
      { q: "Anh em họ", a: "cousin" }, { q: "Cháu trai", a: "nephew" }, { q: "Cháu gái", a: "niece" },
      { q: "Mẹ kế", a: "stepmother" }, { q: "Bố dượng", a: "stepfather" }, { q: "Vợ", a: "wife" },
      { q: "Chồng", a: "husband" }, { q: "Anh em ruột", a: "sibling" }, { q: "Tổ tiên", a: "ancestor" },
      { q: "Hậu duệ", a: "descendant" }, { q: "Ông bà", a: "grandparents" }, { q: "Cha mẹ", a: "parents" },
      { q: "Con một", a: "only child" }, { q: "Nuôi dưỡng", a: "nurture" }, { q: "Gia đình hạt nhân", a: "nuclear family" },
      { q: "Gia đình mở rộng", a: "extended family" }, { q: "Gắn kết", a: "bonding" }, { q: "Người giám hộ", a: "guardian" },
      { q: "Thế hệ", a: "generation" }, { q: "Di truyền", a: "hereditary" }
    ]
  },
  {
    id: 't2',
    title: 'Topic 8: Tourism – Part 3',
    image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80',
    words: [
      { q: "Hộ chiếu", a: "passport" }, { q: "Thị thực", a: "visa" }, { q: "Hành lý", a: "luggage" },
      { q: "Chuyến bay", a: "flight" }, { q: "Khách sạn", a: "hotel" }, { q: "Tham quan", a: "sightseeing" },
      { q: "Đặc sản", a: "specialty" }, { q: "Bản đồ", a: "map" }, { q: "Hướng dẫn viên", a: "guide" },
      { q: "Kỳ nghỉ", a: "vacation" }, { q: "Bãi biển", a: "beach" }, { q: "Núi", a: "mountain" },
      { q: "Bảo tàng", a: "museum" }, { q: "Quà lưu niệm", a: "souvenir" }, { q: "Đặt phòng", a: "reservation" },
      { q: "Khám phá", a: "explore" }, { q: "Văn hóa", a: "culture" }, { q: "Địa phương", a: "local" },
      { q: "Lịch trình", a: "itinerary" }, { q: "Phiêu lưu", a: "adventure" }
    ]
  },
  // Adding more mock topics to demonstrate pagination (20 topics per page)
  ...Array.from({ length: 48 }).map((_, i) => ({
    id: `auto-${i}`,
    title: `Topic ${i + 9}: Advanced Vocabulary - Part ${i + 1}`,
    image: `https://images.unsplash.com/photo-${1500000000000 + (i * 1000)}?w=600&q=80`,
    words: Array.from({ length: 20 }).map((__, j) => ({ q: `Word ${j + 1} for Topic ${i + 9}`, a: `answer${j + 1}` }))
  }))
];

export const studyTopics: Topic[] = rawTopicData.map(topic => ({
  id: topic.id,
  title: topic.title,
  description: '',
  imageUrl: topic.image,
  questions: topic.words.map((w, idx) => ({
    id: `${topic.id}-q${idx}`,
    question: w.q,
    answer: w.a
  }))
}));

export const shuffleArray = <T,>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
