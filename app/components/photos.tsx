import AppLayout from './app-layout';

export default function Photos({ onBack }: { onBack: () => void }) {
    const mockPhotos = Array.from({ length: 20 }, (_, i) => ({
        id: i,
        url: `https://picsum.photos/300/300?random=${i}`,
        date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));

    return (
        <AppLayout title="Photos" onBack={onBack}>
            <div className="p-6">
                <div className="grid grid-cols-4 gap-4">
                    {mockPhotos.map(photo => (
                        <div key={photo.id} className="relative group">
                            <img 
                                src={photo.url} 
                                alt={`Photo ${photo.id}`}
                                className="w-full h-40 object-cover rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-2 rounded-b-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                {photo.date}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
} 