"use client";

import { useState, useEffect, use, Fragment } from "react";
import { useRouter } from "next/navigation";
import Tooltip from "@mui/material/Tooltip";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Checkbox, CheckboxField } from "@/components/checkbox";
import { Label } from "@/components/fieldset";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

import { supabase } from "@/libs/supabaseClient";
import { GSP_NO_RETURNED_VALUE } from "next/dist/lib/constants";

export default function Prepare({ params }) {
  const router = useRouter();

  const { number } = use(params);

  const { checkedInter, setCheckedInter, settingInter, setSettingInter } =
    useForm();

  const [industry, setIndustry] = useState([]);

  const handleCheckInter = (
    e,
    id,
    large,
    intermediate,
    description,
    code,
    intermediates
  ) => {
    if (e) {
      setCheckedInter((prevList) => [
        ...prevList,
        {
          id,
          large,
          intermediate,
          description,
          code,
          intermediates,
        },
      ]);

      return;
    }

    if (!e) {
      setCheckedInter((prevList) =>
        prevList.filter((inter) => inter.code !== code)
      );
    }
  };

  const handlePrev = () => {
    router.push(`/${number}/basic`);
  };

  const handleNext = () => {
    if (settingInter) {
      router.push(`/${number}/country`);

      return;
    }

    if (checkedInter.length === 0) {
      alert("※ 한 개 이상의 중분류를 선택해 주세요!.");

      return;
    }

    if (
      confirm(
        "※ (주의!!) 선택하신 중분류를 다시 한번 검토해주세요. 현재 선택하신 중분류를 기준으로 다음 설문이 이어집니다.\n현재 페이지 이후, 중분류를 제외하거나 추가로 선택하려는 경우 설문을 처음부터 다시 진행해야 합니다."
      )
    ) {
      setSettingInter(true);

      return;
    }

    if (
      !confirm(
        "※ (주의!!) 선택하신 중분류를 다시 한번 검토해주세요. 현재 선택하신 중분류를 기준으로 다음 설문이 이어집니다.\n현재 페이지 이후, 중분류를 제외하거나 추가로 선택하려는 경우 설문을 처음부터 다시 진행해야 합니다."
      )
    ) {
      return;
    }
  };

  useEffect(() => {
    const fetchIndustry = async () => {
      const { data, error } = await supabase
        .from("industry")
        .select("*")
        .like("code", `${number}%`)
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
            acc.push({
              field: cur.field,
              large: cur.large,
              intermediates,
            });

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
        <Text className="indent-4">※ 기술분류 : {industry[0]?.field}</Text>
        <section className="grid grid-cols-[2fr_3fr] my-4 border-t border-r border-l">
          <div className="border-r border-b bg-gray-100 text-xl font-bold text-center leading-10">
            대분류
          </div>
          <div className="border-b bg-gray-100 text-xl font-bold text-center leading-10">
            중분류
          </div>
          {industry.map((lar, index) => (
            <Fragment key={index}>
              <div
                style={{ gridRow: `span ${lar.intermediates.length}` }}
                className="flex justify-center items-center border-b bg-blue-950 text-2xl font-bold text-white"
              >
                {lar.large}
              </div>
              {lar.intermediates.map((intermediate, index, self) => (
                <CheckboxField key={intermediate.id} className="border-b p-1">
                  <Checkbox
                    aria-label={intermediate.code}
                    name={intermediate.code}
                    onChange={(e) =>
                      handleCheckInter(
                        e,
                        intermediate.id,
                        lar.large,
                        intermediate.intermediate,
                        intermediate.description,
                        intermediate.code,
                        self
                      )
                    }
                    defaultChecked={
                      checkedInter.find(
                        (inter) => inter.code === intermediate.code
                      )
                        ? true
                        : false
                    }
                    disabled={settingInter}
                  />
                  <Label>
                    {intermediate.intermediate}
                    <Tooltip title={intermediate.description}>
                      <button type="button" className="text-red-400">
                        (!)
                      </button>
                    </Tooltip>
                  </Label>
                </CheckboxField>
              ))}
            </Fragment>
          ))}
        </section>
      </main>
      <footer className="flex justify-end gap-4 my-4">
        <Button onClick={handlePrev}>이전</Button>
        <Button onClick={handleNext}>다음</Button>
      </footer>
    </div>
  );
}
