import { useEffect, useState } from "react";
import Button from "@components/Button";
import { setupState } from "src/recoil/atoms/setup";
import { useRecoilState } from "recoil";
import { isMobile } from "react-device-detect";
import EditorHelper from "@helpers/editor";
import useStorage from "@hooks/useStorage";
import StorageFound from "@components/Editor/StorageFound";
import Loading from "@components/Loading";
import SecondTab from "@components/Setup/SecondTab";
import EditWarning from "@components/Editor/EditorWarning";
import { useRouter } from "next/router";
import { useUser } from "@auth0/nextjs-auth0";
import { v4 as uuid } from "uuid";
import FirstTab from "@components/Setup/FirstTab";
import ThirdTab from "@components/Setup/ThirdTab";
import Divider from "@components/Divider";
import useIsMounted from "@hooks/use-is-mounted";

const bottomNav = [1, 2, 3];

export default function Setup() {
  const isMounted = useIsMounted()
  const [completed, setCompleted] = useState<boolean>(false);
  const { user, isLoading, error } = useUser();
  const [config,,] = useRecoilState(setupState);


  const { storage, setStorage, clear } = useStorage(
    "theme",
    EditorHelper.getFakeStorage()
  );

  const [tab, setTab] = useState<number>(1);
  const router = useRouter();


  if (!isMounted() && isLoading) {
    return <Loading />;
  }

  if (isMobile) {
    return <EditWarning />;
  }

  if (!EditorHelper.compare(storage, EditorHelper.getFakeStorage()) && !completed) {
    return <StorageFound clearStorage={clear} />;
  }

  const handleBack = () => setTab(tab - 1);

  const handleNext = () => {
    if (tab === 3) {
      setCompleted(true);
      setStorage(EditorHelper.getFromSetupConfig(config));
      router.push(`/edit/${!user ? "local" : `${uuid()}`}`);
    } else {
      const newTab = tab === 3 ? 1 : tab + 1;
      setTab(newTab);
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center bg-gray-700">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded shadow min-h-96 p-2 flex flex-col">
          <div className="flex-1">
            {tab === 1 && <FirstTab />}
            {tab === 2 && <SecondTab />}
            {tab === 3 && <ThirdTab />}
          </div>
          <Divider />
          <div className="flex justify-end items-end">
            {tab !== 1 && (
              <Button onClick={handleBack} className="mr-2">
                Back
              </Button>
            )}
            <Button onClick={handleNext}>{tab !== 3 ? "Next" : "Done"}</Button>
          </div>
        </div>
        <div className="w-64 mt-8 mx-auto flex justify-between">
          {bottomNav.map((item) => (
            <div
              key={uuid()}
              className={`h-1 w-12 rounded cursor-pointer ${
                tab === item ? "bg-blue-700" : "bg-blue-300"
              }`}
              onClick={() => setTab(item)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
