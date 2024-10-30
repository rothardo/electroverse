interface IProps {
  width: string;
  height?: string;
}

export const SK_Box = ({ width, height }: IProps) => {
  return (
    <div
      className={`bg-light-2 rounded-4px w-${width} h-${height} relative overflow-hidden`}
    >
      <div
        className={`absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.5)] animate-loading`}
      />
    </div>
  );
};

export const SK_Circle = ({ width }: IProps) => {
  return (
    <div
      className={`bg-light-2 rounded-full w-${width} h-${width} relative overflow-hidden`}
    >
      <div
        className={`absolute top-0 right-0 bottom-0 left-0 bg-gradient-to-r from-transparent via-[rgba(255,255,255,0.2)] to-[rgba(255,255,255,0.5)] animate-loading`}
      />
    </div>
  );
};
