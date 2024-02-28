import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { v4 as uuid } from "uuid";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { addDoc, collection } from "firebase/firestore";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { load } from "@cashfreepayments/cashfree-js";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/config/firebaseConfig";
import { Button } from "./ui/button";

const formSchema = z.object({
  admissionNumber: z.string(),
  phoneNo: z
    .string()
    .min(10, {
      message: "Phone number must be 10 digits",
    })
    .min(10, {
      message: "Phone number must be 10 digits",
    }),
  displayName: z.string(),
  email: z.string().email(),
});

export function ProShowTickets() {
  const [user] = useAuthState(auth);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let cashfree: any;
  const initializeSDK = async function () {
    cashfree = await load({
      mode: "sandbox",
    });
  };
  initializeSDK();

  const doPayment = async (value: {
    email: string;
    displayName: string;
    phoneNo: string;
  }) => {
    try {
      if (!user) {
        return;
      }

      console.log(value);

      const response = await fetch(
        "http://localhost:3000/api/v1/cashfree/order",
        {
          method: "POST",
          body: JSON.stringify({
            customer_id: user?.uid,
            customer_name: value.displayName,
            customer_email: value.email,
            customer_phone: value.phoneNo,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${await user.getIdToken()}`,
          },
        }
      );

      const data = await response.json();

      const userRegisteredEvents = collection(db, "user_registed_events");

      const eventsData = [
        {
          event_name: "DAY 1 - PRO SHOW",
          validity: "21th March 2024 | 6:00 AM - 11:59 PM IST",
          counter: 0,
          unique_id: `SRM_${uuid()}`,
        },
        {
          event_name: "DAY 2 - PRO SHOW",
          validity: "22th March 2024 | 6:00 AM - 11:59 PM IST",
          counter: 0,
          unique_id: `SRM_${uuid()}`,
        },
        {
          event_name: "DAY 3 - PRO SHOW",
          validity: "23th March 2024 | 6:00 AM - 11:59 PM IST",
          counter: 0,
          unique_id: `SRM_${uuid()}`,
        },
      ];

      await addDoc(userRegisteredEvents, {
        user_id: user?.uid,
        email: value.email,
        order_id: data.data.order_id,
        payment_status: "pending",
        created_at: new Date(),
        events: eventsData,
      });

      if (data.data == null) {
        console.log(data);
        return;
      }

      const checkoutOptions = {
        paymentSessionId: data.data.payment_session_id,
        redirectTarget: "_self",
      };
      cashfree.checkout(checkoutOptions);
    } catch (error) {
      console.log(error);
    }
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      admissionNumber: "",
      phoneNo: "",
      email: user?.email ?? "",
      displayName: user?.displayName ?? "",
    },
  });

  return (
    <div className="mt-10">
      <Card>
        <CardHeader>
          <CardTitle>Register for Pro Show Tickets</CardTitle>
          <CardDescription className="pt-2">
            Your tickets will be automatically generated and sent via email. You
            can check the adjacent tab for further details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(doPayment)} className="space-y-8">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input disabled {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your email. We will send the ticket to this email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>display Name</FormLabel>
                    <FormControl>
                      <Input placeholder="" disabled {...field} />
                    </FormControl>
                    <FormDescription>
                      Your name will be printed on the ticket. Please enter your
                      full name.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNo"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="-" {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter your phone number. We will contact you if necessary.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit">Get Tickets</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
