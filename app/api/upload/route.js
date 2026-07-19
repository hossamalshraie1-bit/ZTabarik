import { NextResponse } from 'next/server';
import ImageKit, { toFile } from '@imagekit/nodejs';
import { isAdmin } from '@/lib/supabase';

// Initialize ImageKit using environment variables
const imagekit = new ImageKit({
  publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT,
});

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

    const response = await imagekit.files.upload({
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
