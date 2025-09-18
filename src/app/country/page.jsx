import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";

export default function Country() {
  return (
    <div>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
    </div>
  );
}
