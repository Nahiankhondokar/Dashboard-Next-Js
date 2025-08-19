import AppChartArea from "@/components/AppChartArea";
import AppChartBar from "@/components/AppChartBar";

const HomePage = () => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-2 2xl:grid-cols-2 gap-4">
          <div className="bg-primary-foreground p-4 rounded-lg md:col-span-2 lg:col-span-2 xl:col-span-1">
            <AppChartBar />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg md:col-span-2 lg:col-span-2 xl:col-span-1">
            <AppChartArea />
          </div>
          <div className="bg-primary-foreground p-4 rounded-lg">Box 01</div>
          <div className="bg-primary-foreground p-4 rounded-lg">Box 01</div>
          <div className="bg-primary-foreground p-4 rounded-lg">Box 01</div>
      </div>
    );
}

export default HomePage;
