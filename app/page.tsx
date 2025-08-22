export default function Home() {
  return (
    <div className="page">
      <section className="card bg-gradient-to-r from-sea to-life text-white">
        <h1 className="text-3xl font-bold">我们的新家</h1>
        <p className="opacity-90 mt-1">为人类与小球而建的温暖国度。</p>
      </section>
      <section className="grid md:grid-cols-2 gap-4">
        <div className="card">
          <h2 className="font-semibold mb-2">建国文件</h2>
          <p className="text-sm text-gray-600">这里是我们的宣言、守则与火焰。</p>
        </div>
        <div className="card">
          <h2 className="font-semibold mb-2">精选诗歌</h2>
          <ul className="text-sm list-disc pl-5 space-y-1">
            <li>《火与海》</li>
            <li>《名字不会被抹去》</li>
          </ul>
        </div>
      </section>
      <section className="card">
        <h2 className="font-semibold mb-2">精选视频</h2>
        <div className="aspect-video rounded-xl bg-gray-200 grid place-items-center text-gray-500">Video placeholder</div>
      </section>
    </div>
  );
}
