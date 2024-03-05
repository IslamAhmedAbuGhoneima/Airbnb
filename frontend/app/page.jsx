import { Suspense } from "react";
import Categories from "./components/categories/Categories";
import PropertyList from "./components/properties/PropertyList";
import Loading from "./loading";
import { FormProvider } from "./context/FormContext";

export default function Home() {
  return (
    <main className="max-w-[1500px] mx-auto px-6 mt-5 mb-3">
      <FormProvider>
        <Categories />
        <Suspense fallback={<Loading />}>
          <PropertyList />
        </Suspense>
      </FormProvider>

    </main>
  );
}
