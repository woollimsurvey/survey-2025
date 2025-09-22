"use client";

import { useState, useEffect } from "react";
import Form from "next/form";
import { useRouter } from "next/navigation";

import { Heading } from "@/components/heading";
import { Badge } from "@/components/badge";
import { Text } from "@/components/text";
import { Input } from "@/components/input";
import { Listbox, ListboxLabel, ListboxOption } from "@/components/listbox";
import { Button } from "@/components/button";

import { useForm } from "@/contexts/FormContext";

import { supabase } from "@/libs/supabaseClient";

export default function Way() {
  const router = useRouter();

  const {
    name,
    company,
    position,
    classification,
    career,
    tel1,
    tel2,
    tel3,
    email,
    checkedInter,
    largeWay,
    setLargeWay,
  } = useForm();

  const [etc, setEtc] = useState(largeWay[0]?.etc || "");

  const handleSelectWay = (e, way) => {
    setLargeWay((prevWay) =>
      prevWay.map((prev) => {
        if (prev.code === way.code) {
          return { ...prev, way: e };
        }

        return prev;
      })
    );
  };

  const handlePrev = () => {
    setLargeWay((prevList) =>
      prevList.map((prev) => {
        return { ...prev, etc };
      })
    );

    router.push("/independence");
  };

  const handleNext = async () => {
    setLargeWay((prevList) =>
      prevList.map((prev) => {
        return { ...prev, etc };
      })
    );

    const { error1 } = await supabase.from("form").insert(
      checkedInter.map((inter) => {
        return {
          name,
          company,
          position,
          classification,
          etc,
          career,
          tel: tel1 + tel2 + tel3,
          email,
          intermediate: inter.intermediate,
          code: inter.code,
          country: inter.country,
          euName: inter.euName,
          etcName: inter.etcName,
          institution: inter.institution,
          krPer: inter.krPer,
          usPer: inter.usPer,
          cnPer: inter.cnPer,
          jpPer: inter.jpPer,
          euPer: inter.euPer,
          etcPer: inter.etcPer,
          krMonth: inter.krMonth,
          usMonth: inter.usMonth,
          cnMonth: inter.cnMonth,
          jpMonth: inter.jpMonth,
          euMonth: inter.euMonth,
          etcMonth: inter.etcMonth,
          independence: inter.independence,
        };
      })
    );

    // const { error2 } = await supabase.from("form_large").insert(
    //   largeWay.map((way) => {
    //     return {
    //       tel: way.tel,
    //       etc: way.etc,
    //       large: way.large,
    //       code: way.code,
    //       way: way.way,
    //       reason: way.reason,
    //     };
    //   })
    // );

    error1 && console.error(error1);
    // error2 && console.error(error2);

    router.push("/importance");
  };

  useEffect(() => {
    if (largeWay.length === 0) {
      setLargeWay(
        checkedInter
          .sort((a, b) => a.id - b.id)
          .filter(
            (item, index, self) =>
              index ===
              self.findIndex(
                (t) => t.code.substring(0, 2) === item.code.substring(0, 2)
              )
          )
          .map((inter) => {
            return {
              tel: tel1 + tel2 + tel3,
              etc: "",
              large: inter.large,
              code: inter.code.substring(0, 2),
              way: "1",
            };
          })
      );
    }
  }, []);

  return (
    <Form action={handleNext}>
      <header className="my-3 p-3 bg-gray-50">
        <Heading level={2}>
          <Badge className="align-middle">3</Badge> 기술수준조사
        </Heading>
      </header>
      <main>
        <h3 className="my-4 text-3xl font-semibold text-zinc-950">
          □ (기술성) 위원님께서 선택하신 중분류 기술들의 기술성을 평가할 수 있는
          하위 문항에 응답해주시기 바랍니다.
        </h3>
        <Heading level={4}>
          3Q-5. (기술격차 해소방안)&nbsp;
          <span className="font-normal">
            선택하신 기술군의 상위 분류인 대분류의 기술격차를 해소하기 위해 가장
            적합한 방안을 선택해주시기 바라며, 해당 방안을 선택하신 이유를 같이
            기재해주시기 바랍니다.
          </span>
        </Heading>
        <Text className="indent-4">
          ※ <span className="text-red-400">(!)</span>에 마우스를 올리시면 해당
          대분류의 정의와 포함된 중분류 구성을 확인하실 수 있습니다.
        </Text>
        <section className="my-4 border text-center">
          <article className="border-b bg-gray-100 text-lg font-bold leading-8">
            드롭다운 목록
          </article>
          <article className="grid grid-cols-[1fr_1fr_1fr]">
            <div className="border-r border-b">① 정부 R&D 투자 확대 </div>
            <div className="border-r border-b">② 민간 R&D 투자 확대</div>
            <div className="border-b">③ 시설장비 수준 개선</div>
            <div className="border-r border-b">④ 시설장비 활용가능성 제고</div>
            <div className="border-r border-b">⑤ 인력 수급 활성화</div>
            <div className="border-b">⑥ 인력 전문성 제고</div>
            <div className="border-r border-b">⑦ 국내 산학연 협력 강화</div>
            <div className="border-r border-b">⑧ 국제 산학연 협력 강화</div>
            <div className="border-b">⑨ 규제 완화</div>
            <div className="border-r border-b">⑩ R&D 정책 개선</div>
            <div className="border-r border-b">⑪ 시장투자 확대 </div>
            <div className="border-b">⑫ 산업 생태계 개선</div>
            <div className="col-span-3 flex items-center p-1">
              <span className="flex-1">⑬ 기타</span>
              <Input
                aria-label="etc"
                name="etc"
                className="flex-2"
                value={etc}
                onChange={({ target }) => setEtc(target.value)}
              />
            </div>
          </article>
        </section>
        <section className="border text-center">
          <article className="grid grid-cols-[1fr_1fr_1fr] bg-gray-100 text-xl font-bold leading-10">
            <div className="border-r border-b">대분류</div>
            <div className="border-r border-b">기술격차 해소방안</div>
            <div className="border-b">선택 이유(선택)</div>
          </article>
          {largeWay.map((way, index) => (
            <article key={index} className="grid grid-cols-[1fr_1fr_1fr]">
              <div className="border-b bg-blue-950 p-2 text-lg font-bold text-white">
                {way.large}
                <span className="text-red-400">(!)</span>
              </div>
              <div className="flex items-center border-r px-2">
                <Listbox
                  name="way"
                  defaultValue="1"
                  aria-label="way"
                  onChange={(e) => handleSelectWay(e, way)}
                >
                  <ListboxOption value="1">
                    <ListboxLabel>정부 R&D 투자 확대</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="2">
                    <ListboxLabel>민간 R&D 투자 확대</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="3">
                    <ListboxLabel>시설장비 수준 개선</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="4">
                    <ListboxLabel>시설장비 활용가능성 제고</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="5">
                    <ListboxLabel>인력 수급 활성화</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="6">
                    <ListboxLabel>인력 전문성 제고</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="7">
                    <ListboxLabel>국내 산학연 협력 강화</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="8">
                    <ListboxLabel>국제 산학연 협력 강화</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="9">
                    <ListboxLabel>규제 완화</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="10">
                    <ListboxLabel>R&D 정책 개선</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="11">
                    <ListboxLabel>시장투자 확대</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="12">
                    <ListboxLabel>산업 생태계 개선</ListboxLabel>
                  </ListboxOption>
                  <ListboxOption value="13">
                    <ListboxLabel>기타</ListboxLabel>
                  </ListboxOption>
                </Listbox>
              </div>
              <div className="flex items-center px-2">
                <Input
                  aria-label="reason"
                  name="reason"
                  value={
                    largeWay.find((ele) => ele.code === way.code)?.reason || ""
                  }
                  onChange={({ target }) =>
                    setLargeWay((prevList) =>
                      prevList.map((prev) => {
                        if (prev.code === way.code) {
                          return { ...prev, reason: target.value };
                        }

                        return prev;
                      })
                    )
                  }
                />
              </div>
            </article>
          ))}
        </section>
        <footer className="flex justify-end gap-4 my-4">
          <Button onClick={handlePrev}>이전</Button>
          <Button type="submit">다음</Button>
        </footer>
      </main>
    </Form>
  );
}
