import { PostCard } from '@/components/feed/PostCard';

const posts = [
  {
    author: {
      name: 'Dr. Paulo Ricardo',
      avatarUrl: '/images/avatar-placeholder.svg',
    },
    time: 'há 2 minutos',
    content: 'Compromisso com o bem-estar animal!! 🐾',
    imageUrl: '/images/post-placeholder.svg',
  },
  {
    author: {
      name: 'Clínica PetTop',
      avatarUrl: '/images/avatar-placeholder.svg',
    },
    time: 'há 1 hora',
    content: 'Dia de vacinação aqui na PetTop! Traga seu amiguinho para se proteger. 💉❤️',
    imageUrl: '/images/post-placeholder.svg',
  },
  {
    author: {
      name: 'Allan Victor',
      avatarUrl: '/images/avatar-placeholder.svg',
    },
    time: 'há 5 horas',
    content: 'Passeio no parque com o melhor companheiro do mundo! 🌳🐶',
    imageUrl: '/images/post-placeholder.svg',
  },
];

export default function FeedPage() {
  return (
    <div className="py-8 px-4 sm:px-6 lg:px-8 bg-gray-light">
      <div className="max-w-2xl mx-auto">
        <div className="space-y-8">
          {posts.map((post, index) => (
            <PostCard key={index} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
