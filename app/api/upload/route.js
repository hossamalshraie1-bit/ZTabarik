import { NextResponse } from 'next/server';
import ImageKit, { toFile } from '@imagekit/nodejs';
import { isAdmin } from '@/lib/supabase';

// Lazy instantiation helper of ImageKit to avoid crashes during compilation/build step if env variables are temporarily absent
let imagekitInstance = null;
function getImageKit() {
  if (!imagekitInstance) {
    const publicKey = process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY;
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    const urlEndpoint = process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT;

    if (!publicKey || !privateKey || !urlEndpoint) {
      // In build/prerender phase, return a skeleton to pass compile checks
      return new ImageKit({
        publicKey: 'placeholder',
        privateKey: 'placeholder',
        urlEndpoint: 'https://placeholder.io',
      });
    }

    imagekitInstance = new ImageKit({ publicKey, privateKey, urlEndpoint });
  }
  return imagekitInstance;
}

// POST /api/upload
// FormData: { file: File }
// Uploads to ImageKit — audio goes to /studio_works/audio, images to /studio_works/images
export async function POST(request) {
  if (!(await isAdmin(request))) {
    return NextResponse.json({ error: 'غير مصرح للوصول' }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'لم يتم توفير أي ملف' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const isAudio = file.type.startsWith('audio/');
    const targetFolder = isAudio ? '/studio_works/audio' : '/studio_works/images';

    const ext = file.name.split('.').pop();
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;

    const response = await getImageKit().files.upload({
      file: await toFile(buffer, uniqueFileName),
      fileName: uniqueFileName,
      folder: targetFolder,
    });

    return NextResponse.json(
      {
        url: response.url,
        fileId: response.fileId,
        path: response.filePath,
      },
      { status: 201 }
    );

  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json({ error: err.message || 'حدث خطأ داخلي أثناء الرفع' }, { status: 500 });
  }
}
