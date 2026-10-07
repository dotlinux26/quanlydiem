const HO_TEN = [
  'Nguyễn Văn An',
  'Trần Thị Bích',
  'Lê Hoàng Cường',
  'Phạm Minh Đức',
  'Vũ Thu Hà',
  'Đặng Quang Huy',
  'Bùi Thị Hương',
  'Đỗ Văn Khánh',
  'Hoàng Ngọc Linh',
  'Ngô Thế Long',
  'Phan Thanh Mai',
  'Trịnh Đức Nam',
  'Vương Thị Ngọc',
  'Lý Văn Phúc',
  'Hồ Gia Bảo',
]

const DIA_CHI = [
  'Hà Nội',
  'Hải Phòng',
  'Đà Nẵng',
  'TP.HCM',
  'Cần Thơ',
  'Bình Dương',
  'Đồng Nai',
  'Long An',
  'Tiền Giang',
  'Vũng Tàu',
  'Bình Thuận',
  'Nghệ An',
  'Hà Tĩnh',
  'Quảng Bình',
  'Quảng Trị',
]

const QUE_QUAN = [
  'Hà Nội',
  'Hải Phòng',
  'Đà Nẵng',
  'TP.HCM',
  'Cần Thơ',
  'Bình Dương',
  'Đồng Nai',
  'Long An',
  'Tiền Giang',
  'Vũng Tàu',
  'Bình Thuận',
  'Nghệ An',
  'Hà Tĩnh',
  'Quảng Bình',
  'Quảng Trị',
]

export function createSeed() {
  const lops = [
    { id: 1, ten: 'CNTT - K18A', namHoc: '2026-2027', giaoVienId: 1 },
    { id: 2, ten: 'CNTT - K18B', namHoc: '2026-2027', giaoVienId: 1 },
    { id: 3, ten: 'KTPM - K18A', namHoc: '2026-2027', giaoVienId: 1 },
  ]

  const monHocs = [
    { id: 1, ma: 'TIN101', ten: 'Lập trình C', soTinChi: 3 },
    { id: 2, ma: 'TIN102', ten: 'Cấu trúc dữ liệu', soTinChi: 3 },
    { id: 3, ma: 'WEB201', ten: 'Phát triển web', soTinChi: 3 },
  ]

  const sinhViens = []
  let svId = 0
  for (const lop of lops) {
    for (let i = 0; i < 5; i++) {
      svId += 1
      const hocSinh = HO_TEN[svId - 1]
      const queQuan = QUE_QUAN[Math.floor(Math.random() * QUE_QUAN.length)]
      const diaChi = DIA_CHI[Math.floor(Math.random() * DIA_CHI.length)]
      const ngaySinh = `${2004 + Math.floor(Math.random() * 2)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`
      const gioiTinh = Math.random() > 0.5 ? 'Nam' : 'Nữ'
      
      sinhViens.push({
        id: svId,
        ma: `SV${String(svId).padStart(4, '0')}`,
        hoTen: hocSinh,
        lopId: lop.id,
        email: `${hocSinh.toLowerCase().replace(/\s+/g, '.').normalize('NFD').replace(/[\u0300-\u036f]/g, '')}@student.edu.vn`.toLowerCase(),
        soDienThoai: `09${String(Math.floor(Math.random() * 90000000) + 10000000).padStart(8, '0')}`,
        ngaySinh: `${2004 + Math.floor(Math.random() * 2)}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
        gioiTinh: Math.random() > 0.5 ? 'Nam' : 'Nữ',
        diaChi: `${Math.floor(Math.random() * 100) + 1} ${['Nguyễn Trãi', 'Lê Lợi', 'Trần Hưng Đạo', 'Lý Thường Kiệt', 'Hai Bà Trưng', 'Trần Phú', 'Cách Mạng', 'Điện Biên Phủ'][Math.floor(Math.random() * 8)]}, ${diaChi}, ${queQuan}`,
        queQuan: queQuan,
        soDienThoai: `09${String(Math.floor(Math.random() * 90000000) + 10000000).padStart(8, '0')}`,
        ngaySinh: ngaySinh,
        gioiTinh: Math.random() > 0.5 ? 'Nam' : 'Nữ',
        ghiChu: '',
        createdAt: '2026-09-24T10:00:00+07:00',
        updatedAt: '2026-09-24T10:00:00+07:00',
      })
    }
  }

  const DIEM_MAC_DINH = [
    { tx: 8, gk: 7.5, ck: 9 },
    { tx: 6, gk: 6.5, ck: 7 },
    { tx: 9, gk: 8, ck: 8.5 },
    { tx: 5, gk: 5.5, ck: 6 },
    { tx: 7.5, gk: 7, ck: 8 },
  ]

  const diems = DIEM_MAC_DINH.map((d, i) => ({
    id: i + 1,
    sinhVienId: i + 1,
    monHocId: 1,
    lopId: 1,
    ...d,
    createdAt: '2026-09-24T10:00:00+07:00',
    updatedAt: '2026-09-24T10:00:00+07:00',
  }))

  return {
    users: [
      {
        id: 1,
        username: 'gv01',
        password: '$2b$10$egXMT.HwNsgVeulESWpNIeegeMy8HUPZEKZYc0KDMqmhZmmjNeHEG',
        role: 'GIAO_VIEN',
        name: 'Nguyễn Văn Giáo',
      },
      {
        id: 2,
        username: 'quanly01',
        password: '$2b$10$egXMT.HwNsgVeulESWpNIeegeMy8HUPZEKZYc0KDMqmhZmmjNeHEG',
        role: 'QUAN_LY',
        name: 'Người quản lý',
      },
      {
        id: 3,
        username: 'gv02',
        password: '$2b$10$egXMT.HwNsgVeulESWpNIeegeMy8HUPZEKZYc0KDMqmhZmmjNeHEG',
        role: 'GIAO_VIEN',
        name: 'Trần Thị Lan',
      },
    ],
    lops,
    monHocs,
    sinhViens,
    diems,
  }
}