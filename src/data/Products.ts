import type { Product } from '../types';

export const initialProducts: Product[] = [
  {
    id: '1',
    title: 'L-ფორმის კუთხის დივანი ტერასისთვის',
    description: 'მყუდრო და ტევადი კუთხის დივანი ხის ორმაგი პადონის ბაზით, სქელი წყალგაუმტარი ლეიბებითა და რბილი ბალიშებით.',
    price: 890,
    category: 'sofas',
    dimensions: '240 x 200 x 75 სმ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD3H_Y4zBFrS2QJcBhbayLsEl53Y6Gq78y6orhAIMrEFoQFY4LK7rm6G02ZkIZIav3AN2-1OHqP9Cdr0txXGS2NVjOvN5gtpBVHidr7Q-Tfpv4z9Z64pEwsquvokxwVdORX3HQiDhbaN5akxCp2lKWyYtkxlkNYPU65SzdeQmlQjZHa-Fvg_bf2MXdnOxfs4GT9wbjtgT2qdI_mT3OD-U7uJhOZNLqxHfNJ5GZpuF0RbQAa2yyF05dvpg',
    badge: 'ბესტსელერი',
    features: ['წყალგაუმტარი ბალიშები', 'საგულდაგულოდ გაშლილი']
  },
  {
    id: '2',
    title: 'მინისზედაპირიანი ჟურნალების მაგიდა გორგოლაჭებით',
    description: 'ორდონიანი პალეტის კონსტრუქცია გამძლე ინდუსტრიული გორგოლაჭებით, ჟურნალების სათავსო ნიშითა და 8მმ ნაწრთობი მინით.',
    price: 290,
    category: 'tables',
    dimensions: '80 x 60 x 42 სმ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCFTFwhPj-wPC23YzhPjWFKw3OP8LUdbgCfP0NkyqckZ-0qCrvJHQ63CPjWqm-sG1CQl11IsxNmVE9gMM1DnxqPuqiaKq2kPx43TuqK8ypDrFru4PYZi7iKk2oQBaQ18YyQnhfuIDuO-aznOSuZMkyD4qjBAPqSTeiZ7P4aOL7haRCohRd7Wk5UqBXQ6zXlM9-ECPrY4zIsJWmJ8TsKMJHulXSSjDAw9EtX1Z9WAG7P3K4z_Ppxc132sw',
    badge: 'ჰიტი',
    features: ['8 მმ ნაწრთობი მინა', '4 ბორბალი მუხრუჭით']
  },
  {
    id: '3',
    title: 'ვერტიკალური მცენარეების კედელი-თარო პალეტისგან',
    description: 'დეკორატიული და პრაქტიკული ვერტიკალური ბაღი ყვავილებისთვის, მწვანილისა და სუკულენტებისთვის.',
    price: 160,
    category: 'custom',
    dimensions: '120 x 80 x 15 სმ',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAfeaVjVxjOIKiO40f8RfnC0T_wTiHpOpSXIm4GC44sz1qUZ-huAZUUV3-wNUMIoulgtZk8M7kzvU3Pru73FQoxgvV2lYKF2DZTlYfBJUkUh2Bpzzmi85NBD-RZBaY-z7fGAU1O-eadSjAaT-eqFmic9XqJ9q1Rclopyftei0TrdWDhqmoMbX5gnQ6tYipJXMNdt-2Hne-Xepu_cXZnd2FFfGGPpEPj2xcM2YRxqVDciPG64viA2szY7g',
    badge: 'მწვანე ზონა',
    features: ['კედელზე სამაგრი', 'ტენდაცვითი ფენა']
  }
];