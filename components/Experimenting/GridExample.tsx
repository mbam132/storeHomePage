function GridExample() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 gap-4">
      <div className="col-span-2 bg-primary-400 h-[60px]">s</div>
      <div className="row-span-2 flex">
        <div className="bg-yellow-500 flex grow items-center justify-center">
          <p>div 1</p>
        </div>
        <div className="bg-orange-950 flex grow items-center justify-center">
          <p>div 2</p>
        </div>
      </div>
      <div className="bg-secondary-200 h-[60px]">qw</div>
      <div className="bg-secondary-400 h-[60px]">gg</div>
    </div>
  );
}

export default GridExample;
