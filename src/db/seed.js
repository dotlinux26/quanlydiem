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
      sinhViens.push({
        id: svId,
        ma: `SV${String(svId).padStart(4, '0')}`,
        hoTen: HO_TEN[svId - 1],
        lopId: lop.id,
      })
    }
  }

  const DIEM_MAC_DINH = [
    { thuongKy: 8, giuaKy: 7.5, cuoiKy: 9 },
    { thuongKy: 6, giuaKy: 6.5, cuoiKy: 7 },
    { thuongKy: 9, giuaKy: 8, cuoiKy: 8.5 },
    { thuongKy: 5, giuaKy: 5.5, cuoiKy: 6 },
    { thuongKy: 7.5, giuaKy: 7, cuoiKy: 8 },
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
        password: '123456',
        role: 'GIAO_VIEN',
        name: 'Nguyễn Văn Giáo',
      },
      {
        id: 2,
        username: 'quanly01',
        password: '123456',
        role: 'QUAN_LY',
        name: 'Người quản lý',
      },
    ],
    lops,
    monHocs,
    sinhViens,
    diems,
  }
}