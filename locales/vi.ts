import type { Dictionary } from '@/types/i18n';

const vi: Dictionary = {
  home: {
    title: 'Pokédex',
    subtitle: 'Khám phá Pokédex và lọc theo hệ. Dữ liệu từ PokéAPI.',
    filterLabel: 'Lọc theo hệ',
    filterAriaLabel: 'Lọc Pokémon theo hệ',
    filterAllOption: 'Tất cả các hệ',
    metaAll: 'Hiển thị {start}–{end} trong tổng số {total} Pokémon.',
    metaType: 'Hiển thị {start}–{end} trong tổng số {total} Pokémon thuộc hệ {type}.',
    empty: 'Không có Pokémon nào khớp với bộ lọc.',
    noResults: 'Không tìm thấy Pokémon.'
  },
  pagination: {
    previous: 'Trước',
    next: 'Sau',
    goToPage: 'Tới trang {page}',
    pageSummary: 'Trang {current} / {total}'
  },
  card: {
    viewDetails: 'Xem chi tiết {name}'
  },
  detail: {
    back: '← Quay lại Pokédex',
    height: 'Chiều cao',
    weight: 'Cân nặng',
    baseExp: 'Kinh nghiệm cơ bản',
    abilities: 'Năng lực',
    hiddenAbility: 'Ẩn',
    stats: 'Chỉ số cơ bản',
    notFoundTitle: 'Không tìm thấy Pokémon',
    notFoundDescription: 'Pokémon bạn yêu cầu không tồn tại trong Pokédex.'
  },
  locale: {
    label: 'Ngôn ngữ',
    ariaLabel: 'Thay đổi ngôn ngữ ứng dụng',
    options: {
      en: 'English',
      vi: 'Tiếng Việt'
    }
  }
};

export default vi;
