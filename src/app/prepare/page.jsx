"use client";

import { useState, useEffect, Fragment } from "react";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Checkbox, CheckboxField } from "@/components/checkbox";
import { Label } from "@/components/fieldset";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

import { supabase } from "@/libs/supabaseClient";

export default function Prepare() {
  const router = useRouter();

  const { checkedInter, setCheckedInter } = useForm();

  const [industry, setIndustry] = useState([]);

  const handleChecked = (e, id, intermediate, code) => {
    if (e) {
      setCheckedInter((prevList) => [...prevList, { id, intermediate, code }]);

      return;
    }

    if (!e) {
      setCheckedInter((prevList) =>
        prevList.filter((inter) => inter.code !== code)
      );
    }
  };

  const handleNext = () => {
    if (checkedInter.length === 0) {
      alert("중분류를 선택해 주세요.");

      return;
    }

    router.push("/country");
  };

  useEffect(() => {
    const fetchIndustry = async () => {
      const { data, error } = await supabase
        .from("industry")
        .select()
        .order("id");

      setIndustry(
        data.reduce((acc, cur) => {
          const intermediates = [];

          data.forEach((ele) => {
            if (cur.large === ele.large) {
              intermediates.push({
                id: ele.id,
                intermediate: ele.intermediate,
                description: ele.description,
                code: ele.code,
              });
            }
          });

          !acc.find((ele) => ele.large === cur.large) &&
            acc.push({ large: cur.large, intermediates });

          return acc;
        }, [])
      );

      error && console.error(error);
    };

    fetchIndustry();
  }, []);

  return (
    <div>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">2</Badge> 준비단계
        </Heading>
      </header>
      <main>
        <Heading level={3}>
          2Q. 주요 산업 분야 중분류 기술분야 중 귀하께서 응답이 가능한 중분류
          기술을 모두 선택해주시기 바랍니다.
        </Heading>
        <Text className="indent-4">
          ※ <span className="text-red-400">(!)</span>에 마우스를 올리시면 해당
          기술의 정의가 표시됩니다.
        </Text>
        <Text className="indent-4">※ 기술분류 예시 : 전기수소자동차</Text>
        <section className="grid grid-cols-[2fr_3fr] my-4 border-t border-r border-l">
          <div className="border-r border-b bg-gray-100 text-lg font-bold text-center leading-8">
            대분류
          </div>
          <div className="border-b bg-gray-100 text-lg font-bold text-center leading-8">
            중분류
          </div>
          {industry.map((lar, index) => (
            <Fragment key={index}>
              <div
                style={{ gridRow: `span ${lar.intermediates.length}` }}
                className="flex justify-center items-center border-r border-b bg-blue-950 text-lg font-bold text-white"
              >
                {lar.large}
              </div>
              {lar.intermediates.map((int) => (
                <CheckboxField key={int.id} className="border-b px-1">
                  <Checkbox
                    aria-label={int.code}
                    name={int.code}
                    value={int.code}
                    onChange={(e) =>
                      handleChecked(e, int.id, int.intermediate, int.code)
                    }
                  />
                  <Label>
                    {int.intermediate}
                    <span className="text-red-400">(!)</span>
                  </Label>
                </CheckboxField>
              ))}
            </Fragment>
          ))}
        </section>
      </main>
      <footer className="text-right">
        <Button onClick={handleNext}>다음</Button>
      </footer>
    </div>
  );
}
