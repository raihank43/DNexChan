export default function FooterComponent() {
  return (
    <footer className="flex flex-col gap-2 justify-center mx-10 py-3 border-y-2  border-orange-300 my-10 bg-orange-200 rounded-lg shadow-lg ">
      <p className="text-center font-semibold text-red-900">
        &copy; {new Date().getFullYear()}{" "} IndoChan
        <p className="text-red-900 hover:text-orange-300 ease-out duration-300 text-sm">
          All trademarks and copyrights on this page are owned by their
          respective parties. Images uploaded are the responsibility of the
          Poster. Comments are owned by the Poster.
        </p>
      </p>
    </footer>
  );
}
