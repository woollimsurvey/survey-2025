"use client";

import { useState, useEffect, Fragment } from "react";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Checkbox, CheckboxField } from "@/components/checkbox";
import { Label } from "@/components/fieldset";

import { supabase } from "@/libs/supabaseClient";

export default function Prepare() {
  const [industry, setIndustry] = useState([]);

  useEffect(() => {
    const fetchIndustry = async () => {
      const { data, error } = await supabase
        .from("industry")
        .select()
        .order("id");

      setIndustry(
        data.reduce((acc, cur) => {
          const intermediate = [];

          data.forEach((ele) => {
            if (cur.large === ele.large) {
              intermediate.push({
                id: ele.id,
                intermediate: ele.intermediate,
                description: ele.description,
              });
            }
          });

          !acc.find((ele) => ele.large === cur.large) &&
            acc.push({ large: cur.large, intermediate });

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
          <div className="border-r bg-blue-950 text-lg font-bold text-white text-center leading-8">
            대분류
          </div>
          <div className="bg-blue-950 text-lg font-bold text-white text-center leading-8">
            중분류
          </div>
          {industry.map((lar, index) => (
            <Fragment key={index}>
              <div
                className={`row-span-${lar.intermediate.length} flex justify-center items-center border-r border-b font-bold`}
              >
                {lar.large}
              </div>
              {lar.intermediate.map((int) => (
                <div key={int.id} className="border-b">
                  <CheckboxField className="px-1">
                    <Checkbox aria-label={int.id} name={int.id} />
                    <Label>
                      {int.intermediate}
                      <span className="text-red-400">(!)</span>
                    </Label>
                  </CheckboxField>
                </div>
              ))}
            </Fragment>
          ))}
        </section>
      </main>
    </div>
  );
}
