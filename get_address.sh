#!/bin/bash
chain=("CareCenter" "RelayChain" "Hospital")
new=()
for i in "${chain[@]}";
do
    echo $i" key"
    for j in {1..4};
    do
        address=$(cat ./network/$i/qdata/dd$j/keystore/key | grep -o '"address":"[^,]*' | cut -d '"' -f 4)
        address="0x"$address
        new+=($address)
        echo $address
    done
done
echo "-----------------"

# Replace
# old=(
#     "0x57745fca90934062d05e76e99655f424be713c6d" \
#     "0xa93278ed1977727474ccd5b0d4ac313037d7f8a6" \
#     "0x281c5cb496a751305b0dd7907320ee55836095c6" \
#     "0x406986b7f121e58453cff9950a27e75ba9d8ea82" \
#     "0xb6b724877f84a630a0a9bff1aa4093b1acb37316" \
#     "0x1f33e7167f2938d80408f4c3d3507c927877b350" \
#     "0x89326c9b03e4ebee6fadcad18c8e98a4e7033f8c" \
#     "0x18e6b9f7d93ebd4d46ad993638a2a51c3d8d168b" \
#     "0x95c0abb132fef71d6351cfde3daecc06b5f14d08" \
#     "0xfe98d6e761e11e9752b08c655910256899bf366a" \
#     "0x21d4935c9bc94b4cf5b87555e0eaf767c66f77fd" \
#     "0x06de588f1a693fb6fdb6414242903b769d3d9a41"
# )

# path=(
#     "./12-node/node1-client/config.js" \
#     "./12-node/node2-bridge/config.js" \
#     "./12-node/node3-bridge/config.js" \
#     "./12-node/node4-bridge/config.js" \
#     "./12-node/node5-bridge/config.js" \
#     "./12-node/node6-bridge/config.js" \
#     "./12-node/node7-bridge/config.js" \
#     "./12-node/node8-bridge/config.js" \
#     "./12-node/node9-bridge/config.js" \
#     "./12-node/node10-bridge/config.js" \
#     "./12-node/node11-bridge/config.js" \
#     "./12-node/node12-client/config.js" \
#     "./12-node/node2-bridge/init-node.js" \
#     "./12-node/node6-bridge/init-node.js" \
#     "./12-node/node10-bridge/init-node.js" \
# )
# for ((i=0; i<${#old[@]}; i++));
# do
#     node=$((i+1))
#     echo "Replace:":${old[i]}" => "${new[i]}
#     for p in "${path[@]}";
#     do
#         echo "grep:"$p
#         grep "${old[i]}" "$p"
#         # sed -i.bak "s/${old[i]}/${new[i]}/g" "$p" #replace
#         # rm "$p".bak #remove backup
#     done
# done