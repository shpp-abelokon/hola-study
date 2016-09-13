#!/bin/bash
clear
read -n 1 -p "Ты уверен, что хочешь запустить это (y/n): " AMSURE
echo $'\n'
if [ "$AMSURE" = "y" ]; then
  echo 'Скрипт выполняется'
else
  exit 1
fi
echo "$OSTYPE $HOSTTYPE "
echo "" 1>&2

if [ ! -x  /opt/mychat ]; then
    echo "Clone git repozito"
    exit 1

fi


# echo "$1 Проверяется \"1\""
# text = 'start'
# if [ $1 == $text ];    # единица
# then
#   echo "1 -- это истина."
# else
#   echo "1 -- это ложь."
# fi            # 1 -- это ложь.
#
# echo





# echo "Install Chat"
# echo "install git"
# sudo apt-get install git

# echo "Please enter  your name!" #echo "privet!"
#pwd
#ls -l
# read -p "Please enter  your name: " var_name
# echo "Hello $var_name, nice"
# a=12
# b=4
# c=$[$a+$b]
# echo "111111+ $c"

# read -p "mychat " var_name
#
# if [ $var_name = "start" ]
# then
#   echo 'Work!'
# cd ~/myProject/hola-study/day20-return-to-linux && node server.js
