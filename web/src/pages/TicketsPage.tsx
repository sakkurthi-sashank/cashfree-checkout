import { FirebaseAuthWrapper } from "@/components/auth-wrapper/firebaseAuthWrapper";
import { ModeToggle } from "@/components/mode-toggle";
import MyTickets from "@/components/my-tickets";
import { ProShowTickets } from "@/components/pro-show-tickets-form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserDropdown } from "@/components/user-dropdown";
// import { z } from "zod";

export const TicketsPage = () => {
  // const formSchema = z.object({});
  return (
    <FirebaseAuthWrapper>
      <div className="min-h-screen pb-10 w-full">
        <div className="flex px-4 py-3 w-full justify-between">
          <img
            src="/images/infinitus2024.png"
            className="w-fit h-12 bg-black p-2 rounded-lg"
            alt=""
          />

          <div className="space-x-4 flex items-center">
            <ModeToggle />
            <UserDropdown />
          </div>
        </div>

        <div className="flex justify-center w-full mt-4">
          <div className="w-full flex justify-center items-center h-full">
            <Tabs
              defaultValue="pro-show-tickets"
              className="max-w-xl w-full px-3 mt-4"
            >
              <TabsList className="w-full flex justify-between">
                <TabsTrigger value="pro-show-tickets" className="w-full">
                  Pro Show Tickets
                </TabsTrigger>
                <TabsTrigger value="my-tickets" className="w-full">
                  My Tickets
                </TabsTrigger>
              </TabsList>
              <TabsContent value="pro-show-tickets">
                <ProShowTickets />
              </TabsContent>
              <TabsContent value="my-tickets">
                <MyTickets />
              </TabsContent>
            </Tabs>
          </div>

          {/* <div className="hidden lg:block w-full my-auto">
            <div className="w-full flex justify-center items-center">
              <img
                src="/images/arman-malik02.jpg"
                alt=""
                className="max-w-lg rounded-lg overflow-hidden"
              />
            </div>
          </div> */}
        </div>
      </div>
    </FirebaseAuthWrapper>
  );
};
