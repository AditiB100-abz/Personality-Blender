import HomeScreen from "../HomeScreen";

export default function HomeScreenExample() {
  return (
    <div className="bg-background min-h-[400px]">
      <HomeScreen onStart={() => console.log("Start clicked")} />
    </div>
  );
}
